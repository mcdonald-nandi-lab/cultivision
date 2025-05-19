"use client";

import { ReactNode } from "react";

type ProviderComponent = React.ComponentType<{ children: ReactNode }>;

interface ComposeProvidersProps {
  providers: ProviderComponent[];
  children: ReactNode;
}

/**
 * Composes multiple provider components into a single component
 * @param providers Array of provider components to compose
 * @param children The child components to be wrapped
 */
export const ComposeProviders = ({
  providers,
  children,
}: ComposeProvidersProps) => {
  return providers.reduceRight((acc, Provider) => {
    return <Provider>{acc}</Provider>;
  }, <>{children}</>);
};

export default ComposeProviders;
