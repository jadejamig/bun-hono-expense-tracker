import "./App.css";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { useEffect, useState } from "react";

function App() {
  const [totalSpent, setTotalSpent] = useState(0)


  useEffect(() => {
    async function getTotalExpense() {
      const res = await fetch("/api/expenses/total-spent")
      const { total } = await res.json()
      setTotalSpent(total)
    }

    getTotalExpense()
  }, [])

  return (
    <div className="flex justify-center max-w-xl m-auto mt-4">
      <div className="w-full flex flex-col gap-y-2">
        <Card>
          <CardHeader>
            <CardTitle>Expenses</CardTitle>
            <CardDescription>The total amount you've spent</CardDescription>
          </CardHeader>
          <CardContent>
            {totalSpent}
          </CardContent>
        </Card>
        <Button className="w-full">Hello</Button>
      </div>
    </div>
  );
}

export default App;
