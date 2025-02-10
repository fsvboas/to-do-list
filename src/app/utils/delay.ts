export interface DelayProps {
  (ms: number): Promise<void>;
}

export const delay: DelayProps = (ms: number): Promise<void> => {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};
