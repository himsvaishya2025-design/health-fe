import { formatDate } from "../utils/formatDate";
import { formatTime } from "../utils/formatTime";

export const memberFields = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter full name",
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: true,
    placeholder: "e.g. 9876543210",
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
    optionsKey: "packages",
    getValue: (val) => val?._id ?? val ?? "",
  },
  {
    name: "trainerId",
    label: "Trainer",
    type: "select",
    optionsKey: "trainers",
    getValue: (val) => val?._id ?? val ?? "",
  },
  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    getValue: (val) => (val ? val.substring(0, 10) : ""),
  },
  {
    name: "membershipEndDate",
    label: "Membership End Date",
    type: "date",
    getValue: (val) => (val ? val.substring(0, 10) : ""),
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: "Active" },
      { label: "Inactive", value: "Inactive" },

    ],
    defaultValue: "Active",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    placeholder: "Street, city, state…",
    colSpan: 2,
  },
];


export const attendanceFeilds = [

  { key: "memberName", label: "Name", sortable: true },

  { key: "firstIn", label: "Last In Time",getValue: (val) => (val ? formatTime(val) : ""),},
  { key: "lastOut", label: "Last Out Time" ,getValue:(val)=>(val ? formatTime(val): "" )},
  {key:"date", label:"Date", getValue:(val)=> (val?formatDate(val):""),sortable:true}
   
  

];


