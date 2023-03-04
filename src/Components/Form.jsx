import React, { useState } from "react";
import styles from "../Styles/form.module.css";
import validator from "validator";
import { Upload } from "upload-js";
import { useNavigate } from "react-router-dom";
const Form = (props) => {
   const [state, setState] = useState([]);
   const [object, setObject] = useState({
     
   });
   const navigate = useNavigate();
   const uploader = Upload({
      apiKey: "free",
   });
   const handleChange = (e) => {
      const { name, value } = e.target;
      setObject({ ...object, [name]: value, errors: { [name]: "" } });
   };
   const onFileSelected = async (event) => {
      try {
         const { fileUrl } = await uploader.uploadFile(event.target.files[0], {
            onProgress: ({ progress }) => console.log(`${progress}% complete`),
         });
         setObject({ ...object, url: fileUrl });
      } catch (e) {
         alert(`Error!\n${e.message}`);
      }
   };

   const handleSave = () => {
      if (!object.name) {
         setObject({ ...object, errors: { name: "Name is required..!" } });
      } else if (!object.email) {
         setObject({ ...object, errors: { email: "Email is required..!" } });
      } else if (!validator.isEmail(object.email)) {
         setObject({ ...object, errors: { email: "Invalid email. Please enter valid email..!" } });
      } else if (!object.mobile) {
         setObject({ ...object, errors: { mobile: "Mobile number is required..!" } });
      } else if (
         typeof object.mobile == "number"
            ? object.mobile.toString().length !== 10
            : object.mobile.length !== 10
      ) {
         setObject({
            ...object,
            errors: { mobile: "Invalid mobile number..! Please enter 10 digits mobile" },
         });
      } else {
         alert(`${state.length + 1} persons data saved.`);
         setObject({ name: "", mobile: "", email: "", url: "" });
         setState([...state, object]);
         document.getElementById("files").value = "";
         console.log(state, "Updated Object");
      }
   };

   const handleSubmit = () => {
      if (state.length === 0) {
         alert("atleast you have to one user data");
      } else {
         navigate("/preview", { state: { state } });
      }
   };

   return (
      <div className={styles.mainContainer}>
         <p>Your Details</p>
         <div className={styles.commonStyleDiv}>
            <label htmlFor="">Full Name * </label> <br />
            <input
               type="text"
               placeholder="Enter your name"
               name="name"
               onChange={(e) => handleChange(e)}
               value={object.name}
            />
            <p className={styles.errorFeedback}>{object.errors?.name}</p>
         </div>
         <div className={styles.commonStyleDiv}>
            <label htmlFor="">Email * </label> <br />
            <input
               type="email"
               placeholder="Enter your email address"
               name="email"
               onChange={(e) => handleChange(e)}
               value={object.email}
            />
            <p className={styles.errorFeedback}>{object.errors?.email}</p>
         </div>
         <div className={styles.commonStyleDiv}>
            <label htmlFor="">Mobile Number * </label> <br />
            <input
               type="number"
               placeholder="xxx-xxx-xxxx"
               name="mobile"
               onChange={(e) => handleChange(e)}
               value={object.mobile}
            />
            <p className={styles.errorFeedback}>{object.errors?.mobile}</p>
         </div>
         <div className={styles.commonStyleDiv}>
            <label htmlFor="">Upload IMage</label> <br />
            <input
               type="file"
               placeholder="xxx-xxx-xxxx"
               name="image"
               id="files"
               onChange={(e) => onFileSelected(e)}
            />
         </div>
         <div className={styles.commonStyleDivLast1}>
            <button onClick={handleSave} className={styles.button}>
               Save
            </button>
         </div>
         <div className={styles.commonStyleDivLast2}>
            <button onClick={handleSubmit} className={styles.button}>
               Submit
            </button>
         </div>
      </div>
   );
};

export default Form;
