import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import type { Root, Separator } from "fumadocs-core/page-tree";
import metaRoot from "../../../content/docs/meta.json";

// ----- type helpers (no `any`)
type Child = Root["children"][number];

function isRecord(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function getNodeName(node: Child): string {
  // prefer entry.name, then name, then title
  if (isRecord(node) && isRecord(node.entry)) {
    const name = node.entry.name;
    if (typeof name === "string") return name;
  }
  if (isRecord(node) && typeof node.name === "string") return node.name;
  if (isRecord(node) && typeof node.title === "string") return node.title;
  return "";
}

export default function Layout({ children }: { children: ReactNode }) {
  const options = baseOptions;
  const originalTree = source.pageTree;

  // 1) order from meta.json
  const desiredOrder = Object.keys(metaRoot as Record<string, unknown>);

  // 2) find & pin "Blocksmith"
  const targetNames = ["Blocksmith Studios", "Item Builder"]
  const blocksmithNode = originalTree.children.filter((n) =>
      targetNames.includes(getNodeName(n))
  );

  // Filter out those nodes from the rest
  const others: Child[] = originalTree.children.filter(
      (n) => !blocksmithNode.includes(n)
  );

  // 3) sort others by meta order
  const sortedOthers: Child[] = [...others].sort((a, b) => {
    const indexA = desiredOrder.indexOf(getNodeName(a));
    const indexB = desiredOrder.indexOf(getNodeName(b));
    const safeA = indexA === -1 ? Number.POSITIVE_INFINITY : indexA;
    const safeB = indexB === -1 ? Number.POSITIVE_INFINITY : indexB;
    return safeA - safeB;
  });

  // 4) group Paid vs Free (keep order after sorting)
  const freePlugins = new Set<string>([
    // put free plugin names here (must match sidebar titles)
    "Avatardonation",
    "Playerprofiles",
    "Nextannouncers",
    // "NextCoinFlip",
    // "NextGens",
  ]);

  const paidNodes: Child[] = [];
  const freeNodes: Child[] = [];
  for (const node of sortedOthers) {
    (freePlugins.has(getNodeName(node)) ? freeNodes : paidNodes).push(node);
  }

  // 5) build final tree: Intro → Blocksmith → Paid → Free
  const sepIntro: Separator = { type: "separator", name: "Introduction" };
  const sepPaid: Separator = { type: "separator", name: "Premium Plugins" };
  const sepFree: Separator = { type: "separator", name: "Other Plugins" };

  const newChildren: Child[] = [
    sepIntro as unknown as Child,
    ...blocksmithNode,
    sepPaid as unknown as Child,
    ...paidNodes,
    sepFree as unknown as Child,
    ...freeNodes
  ];

  const modifiedTree: Root = { ...originalTree, children: newChildren };

  return (
    <DocsLayout
      sidebar={{
        tabs: [
          {
            title: 'Blocksmith',
            url: '/',
            icon: (
              <img
                src="/img/logo.png"
                alt="Blocksmiths logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextAnnouncers',
            url: '/nextannouncers/',
            icon: (
              <img
                src="/img/nextannouncers.png"
                alt="NextAnnouncers Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'PlayerProfiles',
            url: '/playerprofiles/features',
            icon: (
              <img
                src="/img/playerprofiles.jpeg"
                alt="PlayerProfiles Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'AvatarDonation',
            url: '/avatardonation/features',
            icon: (
              <img
                src="/img/avatardonation.jpeg"
                alt="AvatarDonation Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextGens',
            url: '/nextgens/features',
            icon: (
              <img
                src="/img/NextGens.png"
                alt="NextGens Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextCollectors',
            url: '/nextcollectors/features',
            icon: (
              <img
                src="/img/NextCollectors.png"
                alt="NextCollectors Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextCoinflip',
            url: '/nextcoinflip',
            icon: (
              <img
                src="/img/NextCoinflip.png"
                alt="NextCoinFlip Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
          {
            title: 'NextCredits',
            url: '/nextcredits/features',
            icon: (
              <img
                src="/img/NextCredits.png"
                alt="NextCredits Logo"
                style={{ borderRadius: '3px' }}
              />
            ),
          },
        ],
        // You can also re-add transforms or other options if needed
      }}
      {...options}
      tree={modifiedTree}
    >
      {children}
    </DocsLayout>
  );
}
