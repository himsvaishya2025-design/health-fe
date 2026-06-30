import React, { useEffect, useState } from 'react'




import MemberForm from "../../components/MemberForm";
import { getMemberFields } from "../../formJson/form"
import { useParams } from 'react-router-dom';
import { getMemberById ,getMembers,getTrainers} from '../../services/memberApi';
const EditMember = () => {


    const { memberId } = useParams()



    console.log("memberId", memberId);

    const handleCreate = async (data) => {

        console.log(data);

        // await createMember(data)

    };

  

    const [member,setMember]=useState({});
const [packages,setPackages]=useState([]);
const [trainers,setTrainers]=useState([]);


const fields = useMemo(() => {

   return getMemberFields({
      packages,
      trainers,
   });

}, [packages, trainers]);

useEffect(()=>{

   const loadData=async()=>{

      const memberRes=await getMemberById(memberId);

      const packageRes=await getPackages();

      const trainerRes=await getTrainers();

      setMember(memberRes.data);

      setPackages(packageRes.data);

      setTrainers(trainerRes.data);

   }

   loadData();

},[memberId]);








    if (!member) {
        return (<>
            <p>
                Loading data
            </p>

        </>)
    }

    return (

        <MemberForm
            title="Edit Member"
            fields={fields}
            initialValues={member}

            mode="edit"
            onSubmit={handleCreate}
        />

    );
};

export default EditMember;