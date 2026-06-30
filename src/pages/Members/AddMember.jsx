import { useState,useEffect } from "react";
import MemberForm from "../../components/MemberForm";

import {addMemberFields} from "../../formJson/form";
import { listMemberFields } from "../../formJson/form"
import { getPackages,getTrainers } from "../../services/memberApi";




const AddMember = () => {


  

  const handleCreate = async (data) => {

        console.log(data);

        // await createMember(data)

    };
    console.log("addMemberfileds",addMemberFields)

//     const fields = useMemo(() => {

//    return getMemberFields({
//       packages,
//       trainers,
//    });

// }, [packages, trainers]);

useEffect(() => {
   const loadData = async () => {

      const packageRes = await getPackages();
     
      
console.log("packageRes", packageRes);

const trainerRes = await getTrainers();
console.log("trainerRes", trainerRes);

      setPackages(packageRes.data.data);
      setTrainers(trainerRes.data.data);

   };

   loadData();

}, []);

  

    return (

        <MemberForm
            title="Add Member"
            fields={fields}
            mode="add"
            onSubmit={handleCreate}
        />

    );
};

export default AddMember;



