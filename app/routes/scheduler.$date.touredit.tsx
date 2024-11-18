// // routes/scheduler/$date/tour.edit.tsx
// import { json, LoaderFunction, ActionFunction } from "@remix-run/node";
// import { useLoaderData, useNavigate, useSearchParams } from "@remix-run/react";
// import { EditTour } from "~/components/schedule/EditTour";
// import { getTourById } from "~/models/tour.server";
// import type { Tour } from "~/types";

// interface LoaderData {
//   tour?: Tour;
//   isNew: boolean;
// }

// export const loader: LoaderFunction = async ({ request, params }) => {
//   const url = new URL(request.url);
//   const tourId = url.searchParams.get("tourId");

//   if (!tourId) {
//     // This is a new tour from QuickTourModal
//     return json<LoaderData>({ isNew: true });
//   }

//   // This is an existing tour being edited
//   const tour = await getTourById(Number(tourId));
//   if (!tour) {
//     throw new Response("Tour not found", { status: 404 });
//   }

//   return json<LoaderData>({ tour, isNew: false });
// };

// export const action: ActionFunction = async ({ request }) => {
//   const formData = await request.formData();
//   const intent = formData.get("intent");

//   // Handle form submission
//   switch (intent) {
//     case "create":
//       // Handle tour creation
//       break;
//     case "update":
//       // Handle tour update
//       break;
//     default:
//       return json({ error: "Invalid intent" }, { status: 400 });
//   }
// };

// export default function TourEditRoute() {
//   const { tour, isNew } = useLoaderData<LoaderData>();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // Get initial data either from existing tour or search params
//   const initialData = tour || {
//     tourName: searchParams.get("tourName"),
//     shipName: searchParams.get("shipName"),
//     boat: searchParams.get("boat"),
//     startTime: searchParams.get("time"),
//     cruisePassengers: Number(searchParams.get("cruisePassengers")),
//     compPassengers: Number(searchParams.get("compPassengers")),
//     columnPosition: Number(searchParams.get("columnPosition")),
//   };

//   const handleClose = () => {
//     navigate(-1);
//   };

//   const handleSubmit = async (data: any) => {
//     // Submit form data
//     // You can use useFetcher here if needed
//     handleClose();
//   };

//   return (
//     <EditTour
//       open={true}
//       onClose={handleClose}
//       onSubmit={handleSubmit}
//       initialData={initialData}
//       position={{
//         x: Number(searchParams.get("positionX")),
//         y: Number(searchParams.get("positionY"))
//       }}
//       columnPosition={Number(searchParams.get("columnPosition"))}
//     />
//   );
// }
