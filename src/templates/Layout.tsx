import { useMedia } from 'react-use';

interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const isSmallScreen = useMedia('(max-width: 600px)'); // Adjust the maximum width as needed

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex w-full flex-col items-center mb-10">
        {isSmallScreen ? (<div className="w-full p-4">{children}</div>) : (<div className="w-2/3">{children}</div>)}
      </main>
    </div>
  );
};

export default Layout;
