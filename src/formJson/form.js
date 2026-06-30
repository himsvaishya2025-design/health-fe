




export const OPTIONS_ENDPOINTS={
  trainers:"/"
  packages:""
}






export const listMemberFields = [

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
        ],
        
    },

    {
        name: "packageId",
        label: "Package",
        type: "select",
        optionsKey:"packages"
      
         

    },

    {
        name: "trainerId",
        label: "Trainer",
        type: "select",
       optionsKey:"trainers"
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
        optionsKey:"packages"
    },

    {
        name: "trainerId",
        label: "Trainer",
        type: "select",
        optionsKey:"trainers"
       
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