import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
    nav: {
        title: (
            <>
                <span className="blocksmith-brand">
                    <img src="/brand/logo-white-on-blue.svg" alt="" width={48} height={48} />
                    <span>blocksmith<span className="blocksmith-brand-studio">studio</span></span>
                </span>
            </>
        ),
    },
    githubUrl: "https://github.com/blocksmithstudio", 
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
};