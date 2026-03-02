import Link from "next/link";
import { Button } from "../ui/button";

function Header() {
  const content = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Create",
      link: "/post/create",
    },
  ];
  return (
    <div className="w-full sticky top-0 z-10 flex gap-3 px-2 py-3 border-b-2">
      <div className="md:text-2xl font-bold text-lg">Nest.Js 15 Blog</div>
      <div className="place-self-center flex gap-2">
        {content.map((ele) => (
          <div key={ele.link} className="md:text-[16px] text-[12px]">
            {<Link href={ele.link}>{ele.title}</Link>}
          </div>
        ))}
      </div>
      <Button size={"sm"} className="ml-auto py-2" variant={"outline"}>
        Login
      </Button>
    </div>
  );
}

export default Header;
