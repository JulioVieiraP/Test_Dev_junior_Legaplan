"use client"
import Button from "@/components/button";
import Header from "@/components/header";
import List from "@/components/lista";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

export type Data = {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const toggleMenu = () => setIsOpen(!isOpen);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/tasks');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.log('Error fetching data:', error);
      alert('Tente iniciar o backend, com o json server')
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTaskChange = () => {
    fetchData();
  };

  return (
   <>
    <Header />
    <List data={data} onTaskChange={handleTaskChange}/>
    <div className="Button__div">
      <Button text="Adicionar nova tarefa" variant="confirm" onClick={toggleMenu} />
    </div>
    {isOpen && (
      <Modal variant="confirm" toggleMenu={toggleMenu} onTaskChange={handleTaskChange}/>
    )}
   </>
  );
}
