import { getPackages } from "../services/memberApi";


const packages = await getPackages

const trainers=[
    {
    _id: "686123456789abcdef123451",
    fullName: "Rakesh",
  },
  {
    _id: "686123456789abcdef123452",
    fullName: "Soham",
  },
  {
    _id: "686123456789abcdef123453",
    fullName: "Himanshu",
  },
  {
    _id: "686123456789abcdef123454",
    fullName: "Sunny",
  },

]



// export const listMemberFields = [

//     {
//         name: "fullName",
//         label: "Full Name",
//         type: "text",
//         required: true,
//     },

//     {
//         name: "phone",
//         label: "Phone",
//         type: "text",
//         required: true,
//     },

//     {
//         name: "gender",
//         label: "Gender",
//         type: "select",
//         options: [
//             { label: "Male", value: "Male" },
//             { label: "Female", value: "Female" }
//         ],
        
//     },

//     {
//         name: "packageId",
//         label: "Package",
//         type: "select",
//         options: packages.map(pkg => ({
//             label: pkg.packageName,
//             value: pkg._id
//         })),
//          getValue: (value) => value?._id,

//     },

//     {
//         name: "trainerId",
//         label: "Trainer",
//         type: "select",
//         options: trainers.map(tr => ({
//             label: tr.fullName,
//             value: tr._id
//         })),
//          getValue: (value) => value?._id,
//     },

//     {
//         name: "joiningDate",
//         label: "Joining Date",
//         type: "date"
//     },

//     {
//         name: "membershipEndDate",
//         label: "Membership End Date",
//         type: "date"
//     },

//     {
//         name: "address",
//         label: "Address",
//         type: "textarea"
//     }
// ];


export const getMemberFields = ({
  packages = [],
  trainers = [],
  isEdit = false,
}) => [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
  },

  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: true,
  },

  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ],
  },

  {
    name: "packageId",
    label: "Package",
    type: "select",
    options: packages.map((pkg) => ({
      label: pkg.packageName,
      value: pkg._id,
    })),
    getValue: (value) => value?._id,
  },

  {
    name: "trainerId",
    label: "Trainer",
    type: "select",
    options: trainers.map((trainer) => ({
      label: trainer.fullName,
      value: trainer._id,
    })),
    getValue: (value) => value?._id,
  },

  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
  },

  {
    name: "membershipEndDate",
    label: "Membership End Date",
    type: "date",
  },

  {
    name: "address",
    label: "Address",
    type: "textarea",
  },
];





export const addMemberFields=[
    {
        name: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
    },

    {
        name: "phone",
        label: "Phone",
        type: "text",
        required: true,
    },

    {
        name: "gender",
        label: "Gender",
        type: "select",
        options: [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" }
        ]
    },

    {
        name: "packageId",
        label: "Package",
        type: "select",
        options: packages.map(pkg => ({
            label: pkg.packageName,
            value: pkg._id
        }))
    },

    {
        name: "trainerId",
        label: "Trainer",
        type: "select",
        options: trainers.map(tr => ({
            label: tr.fullName,
            value: tr._id
        }))
    },

    {
        name: "joiningDate",
        label: "Joining Date",
        type: "date"
    },

    {
        name: "membershipEndDate",
        label: "Membership End Date",
        type: "date"
    },

    {
        name: "address",
        label: "Address",
        type: "textarea"
    }
]