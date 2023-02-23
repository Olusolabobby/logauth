import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {db, storage} from "../../firebase";
import React, {useState,useEffect} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";


const UserProfile = () => {

    const [user, setUser] = useState([]);
    const [editId, setEditID] = useState('');
    const [editFormValues, setEditFormValues] = useState({});


    useEffect( ()=> {
        UserProfileData();
    }, []);

    useEffect(()=> {
        editId !== '' && setEditFormValues(user.filter(user=> user.id ===editId)[0])
    }, [editId])

    const UserProfileData = () => {
        const docRef = doc(db, "users");
        onSnapshot(docRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}))
            setUser(data)
        })
    }

    const editUserProfile = async (id, newUser= editFormValues) => {
        const docRef=doc(db,"users", id)
        console.log("editFormValues", newUser);
        await setDoc(docRef, newUser);
    }

    const handleSaveEdit = async (id, newUser) => {
        await editUserProfile(id, newUser);
        setEditID('');
        setEditFormValues({});
    }


    const handleUserUpload = (e) => {
        console.log(e.target.files[0])
        const storageRef = ref(storage, `/photos/${e.target.files[0].name}`)
        const uploadData = uploadBytesResumable(storageRef, e.target.files[0])

        uploadData.on("state_changed",
            (snapshot)=> {
                const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                console.log(progress, "%");
            },
            (err)=> console.log(err),
            ()=>{
                getDownloadURL(uploadData.snapshot.ref)
                    // .then(url => console.log(url))
                    .then(url => setEditFormValues(prevState => {
                        return{
                            ...prevState,
                            imageUrl: url,
                            imageName: e.target.files[0].name
                        }
                    }))
            }
        )
    }


    const setFormData = (value, key) => {
        setEditFormValues((prevState)=>{
            return{
                ...prevState,
                [key]: value,
            }
        });
    };

    console.log(editId);

    return(


        <div>
            <h1>Users Profile</h1>

            {user && user((user) => (
                editId !== user?.id
                    ? (<div key={user.id}>
                        <p>{user?.username}</p>
                        <p>{user?.firstname}</p>
                        <p>{user?.lastname}</p>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                        <p>{user?.address}</p>
                        <p>{user?.country}</p>

                        {user?.imageUrl && <img src={user.imageUrl} alt=" " style={{width: "100px"}}/> }

                        <button onClick={()=> setEditID(user?.id)}>Edit Info</button>
                    </div>)
                    :
                    (<div key={user.id}>
                        {editFormValues?.imageUrl && <img src={editFormValues.imageUrl} alt=" " style={{width: "100px"}}/> }

                        <input type="file" onChange={handleUserUpload} />

                        <span>Username</span>
                        <input value={editFormValues?.username}
                               onChange={(e)=> setFormData(e.target.value, 'username')}
                        />
                        <br/>
                        <span>Firstname</span>
                        <input value={editFormValues?.firstname}
                               onChange={(e)=> setFormData(e.target.value, 'firstname')}
                        />
                        <br/>
                        <span>Lastname</span>
                        <input value={editFormValues?.lastname}
                               onChange={(e)=> setFormData(e.target.value, 'lastname')}
                        />
                        <br/>
                        <span>Phone</span>
                        <input value={editFormValues?.phone}
                               onChange={(e)=> setFormData(e.target.value, 'phone')}
                        />
                        <button type='button' onClick={()=>handleSaveEdit(user.id)}>Save Edit</button>

                    </div>)
            ))}

        </div>
    )
}

export default UserProfile;

