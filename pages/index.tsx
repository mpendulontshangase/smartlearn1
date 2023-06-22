import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout";
import styles from "./style.module.css";
import logo from '../Images/BEDlogo.png';
import HomeLayout from "../components/HomeLayout/HomeLayout";
import Landing from "../components/Landing/Landing";


const IndexPage = () => (
<>
<HomeLayout>
<div className={styles.landingContainer}>
  <Landing/>
     </div>
</HomeLayout>
   

    </>

);

export default IndexPage;
