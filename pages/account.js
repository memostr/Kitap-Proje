import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Error from "../components/Error/Error";
import Layout from "../components/Layout";
import UserInfo from "../components/UserInfo/UserInfo";
import UserOffers from "../components/UserOffers/UserOffers";

function Account() {
  const [showError, setShowError] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Retrieve the email from local storage
    const email = localStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    } else {
      // If no email is found, redirect to login page
      router.replace("/login");
    }
  }, [router]);

  const handleLogout = () => {
    // Clear local storage and redirect to login page
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("authToken");
    router.replace("/login");
  };

  const staticUserOffers = [
    {
      id: 1,
      title: "Offer 1",
      description: "Description for Offer 1",
    },
    {
      id: 2,
      title: "Offer 2",
      description: "Description for Offer 2",
    },
    // Add more static offers if needed
  ];

  return (
    <>
      <Head>
        <title>İkinci El Project | Hesabım</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        {showError ? (
          <Error />
        ) : (
          <>
            <UserInfo user={{ email: userEmail }} />
            <UserOffers offers={staticUserOffers} showError={setShowError} />
            <button onClick={handleLogout}>Çıkış Yap</button>
          </>
        )}
      </Layout>
    </>
  );
}

export default Account;
