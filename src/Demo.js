import axios from "axios"

const s = {id:6969,name:'fuck',salary:10,designation:'hero',address:'abd'}

async function putData() {
    const getRes=await axios.get('https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee/')

    var res
    getRes.data.map(async (i)=>{
        res = await axios.delete('https://65c0b652dc74300bce8c98a7.mockapi.io/api/employee/'+i.id)
    })
    console.log(res);
}

putData()