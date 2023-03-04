import React from "react";
import styles from "../Styles/preview.module.css";
import { useLocation } from "react-router-dom";
const Preview = (props) => {
   const location = useLocation();
   return (
      <div>
         <table className={styles.styledTable}>
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Moile</th>
                  <th>Image</th>
               </tr>
            </thead>
            <tbody>
               {location.state?.state?.map((el) => (
                  <tr>
                     <td>{el.name}</td>
                     <td>{el.email}</td>
                     <td>{el.mobile}</td>
                     <td>
                        <img src={el.url} alt="" style={{ margin: "-4px 0 0 0" }} />
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Preview;
