export const Featured = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="gallery-grid">{children}</div>
    </div>
  );
};
