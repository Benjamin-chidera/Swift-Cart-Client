import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminError = () => {
const navigate = useNavigate()

  return (
    <main className="flex justify-center items-center text-center h-screen">
      <section className=" space-y-3">
        <h1 className="font-bold text-xl">404 😢</h1>
        <h3 className="font-semibold text-xl">
          Lost in the Digital Wilderness
        </h3>
        <p className="font-[500] text-xl">
          You've ventured into uncharted digital territory. The page you seek
          has eluded us. Let's guide you back to familiar paths.
        </p>
        <Button onClick={() => navigate(-1)}>GO BACK</Button>
      </section>
    </main>
  );
};

export default AdminError;
