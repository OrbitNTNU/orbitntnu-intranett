interface ILayout {
  children: React.ReactNode;
}

const Layout = ({ children }: ILayout) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="w-1/2">{children}</div>
    </main>
  );
};

export default Layout;
