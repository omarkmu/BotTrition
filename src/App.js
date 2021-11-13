import './App.css';
import React from "react";
import { Dropdown, Option } from "./Dropdown";

/*NOTE:
  Unaware how to connect fdc.py API calls to search bar function.
  I will need help trying to figure out how to connectthe search bar 
  and USDA API to return user requested results. As it stands for an 
  MVP we have good functionality for the main app page, and we can either
  add more functionality than what we have now or save some features to add
  into the app for Sprint 2.

*/
export default function App() {

  //Will handle the diet components
  const [optionValue, setOptionValue] = useState("");
  const handleSelect = (e) => {
    console.log(e.target.value);
    setOptionValue(e.target.value);
  };

  //Will handle the search function
    const form = useRef(null)

    const submit = e => {
      e.preventDefault()
      const data = new FormData(form.current)
      fetch('https://api.nal.usda.gov/fdc/v1/' + query, { method: 'POST', body: data })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    return (
      <div>

        {/* This react component basically gives the app functionality
        to show users the best overall diets they can partake in.
        The component is basically a dropdown menu that the user can
        select the exact diet and click an interactive button to find
        out more about the diet of interest
    */}

        <h1>Find The Best Diet !</h1>
        <Dropdown
          buttonText="Search"
          onChange={handleSelect}
          action="https://health.usnews.com/best-diet/best-diets-overall"
        >
          <Option selected value="Click To See Best Overall Diets" />
          <Option value="Mediterranean Diet" />
          <Option value="DASH Diet" />
          <Option value="The Flexitarian Diet" />
          <Option value="Weight Watchers Diet  " />
          <Option value="Mayo Clinic Diet" />
          <Option value="MIND Diet" />

        </Dropdown>
        <p> You Selected {optionValue}</p>


        {/* Form To Handle API Search Requests */}
        <form ref={form} onSubmit={submit}>
          <input type="text" />
          <input type="submit" name="Search" />
        </form>
      </div>
    );
  }
