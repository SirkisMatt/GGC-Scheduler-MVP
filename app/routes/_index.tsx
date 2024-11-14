// import type { MetaFunction } from "@remix-run/node";
// import { Button, buttonVariants } from "../components/ui/button";
// import { Link } from "@remix-run/react";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

// export default function Index() {
//   return (
//     <div className="flex h-screen items-center justify-center">
//       <div className="flex flex-col items-center gap-16">
//         <>
//           <h1 className="leading text-2xl font-bold text-gray-800">
//             Hello World
//           </h1>
//           <Button>Button</Button>
//           {/* <a href="/demo" className=" text-gray-800">
//             Go to Demo Page
//           </a> */}
//           <Link className={buttonVariants({ variant: "link" })} to={"/demo"}>
//             Click her
//           </Link>

//           {/* <div className="text-gray-800">
//             <Link to="/demo"></Link>
//           </div> */}
//         </>
//       </div>
//     </div>
//   );
// }

import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect("/scheduler");
};
