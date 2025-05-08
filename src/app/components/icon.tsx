interface IconProps {
    path: string,
    viewBox?: string,
    height?: string,
    fill?: string
}

const Icon = ({ height, fill, path, viewBox }: IconProps) => {
    console.log('oje', path, viewBox)
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={viewBox ?? "0 0 512 512"}
      fill={fill ?? "#171717"}
      height={height ?? "1.4em"}
    >
      <path d={path} />
    </svg>
  );
};

export default Icon;