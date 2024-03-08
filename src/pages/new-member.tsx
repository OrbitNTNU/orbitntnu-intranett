// import Layout from "@/templates/Layout";
// import Label from "../components/Label";
// import Input from "../components/Input";
// import { useState } from "react";

// interface NewMember {
//   firstName: string;
//   lastName: string;
//   study: string;
//   phone: string;
//   ntnuMail: string;
// }

// const NewMemberForm = () => {
//   const [form, setForm] = useState<NewMember>({
//     firstName: "",
//     lastName: "",
//     study: "",
//     phone: "",
//     ntnuMail: "",
//   });

//   const updateForm = (key: keyof NewMember) => {
//     return (e: React.ChangeEvent<HTMLInputElement>) => {
//       setForm((prev) => ({ ...prev, [key]: e.target.value }));
//     };
//   };

//   return (
//     <Layout>
//       <form className="flex flex-col">
//         <Label htmlFor="firstName">First name</Label>
//         <Input
//           labelId="firstName"
//           value={form.firstName}
//           onChange={updateForm("firstName")}
//         />
//         <Label htmlFor="lastName">Last name</Label>
//         <Input
//           labelId="lastName"
//           value={form.lastName}
//           onChange={updateForm("lastName")}
//         />
//         <Label htmlFor="study">Field of study</Label>
//         <Input
//           labelId="study"
//           value={form.study}
//           onChange={updateForm("study")}
//         />
//         <Label htmlFor="phone">Phone number</Label>
//         <Input
//           labelId="phone"
//           type="number"
//           value={form.phone}
//           onChange={updateForm("phone")}
//         />
//         <Label htmlFor="ntnu">NTNU mail</Label>
//         <Input
//           labelId="ntnu"
//           type="email"
//           value={form.ntnuMail}
//           onChange={updateForm("ntnuMail")}
//         />
//       </form>
//     </Layout>
//   );
// };

// export default NewMemberForm;
