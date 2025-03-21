import ShortenItem from "./ShortenItem";

interface ShortenUrlListProps {
  data: {
    id: string;
    originalUrl: string;
    shortUrl: string;
    clickCount: number;
    createdDate: string;
  }[];
}

const ShortenUrlList: React.FC<ShortenUrlListProps> = ({ data }) => {
  return (
    <div className="my-6 space-y-4">
      {data.map((item) => (
        <ShortenItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ShortenUrlList;
