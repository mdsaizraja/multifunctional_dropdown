import * as React from "react";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

import InputAdornment from "@mui/material/InputAdornment";

import TextField from "@mui/material/TextField";

import SearchIcon from "@mui/icons-material/Search";

import data from "./employee.json";
import { useState, useMemo } from "react";
import "./App.css";
import { Grid, ListSubheader, Checkbox } from "@mui/material";
import practi from "./practitioners.json";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function App() {
  const [selectedOption, setSelectedOption] = useState([]);
  const [dateValue, setDateValue] = React.useState(null);
  const [result, setResult] = useState("")

  const [searchText, setSearchText] = useState("");

  const containsText = (text, searchText) =>
    text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

  const handleChange = (event) => {
    console.log("ffffgg")
    const value = event.target.value;
    console.log(value);

    if (value[value.length - 1] === "all") {
      setSelectedOption(selectedOption.length === data.length ? [] : data);
      return;
    }
    if (value[value.length - 1] === "all-practitioners") {
      setSelectedOption(selectedOption.length === practi.length ? [] : practi);
      return;
    }
    console.log("aa", value);
    setSelectedOption(value);
  };
  const displayedOptions = (searchText)=>{
   let filterResult = data.filter((option) => containsText(option?.name, searchText))

 setResult(filterResult)

  }
    
  

  const isAllSelected =
    data.length > 0 && selectedOption.length === data.length;

  const isAllpractiSelected =
    practi.length > 0 && selectedOption.length === practi.length;

    const handleSearch = (e) =>{
      searchText= e.target.value;
      setSearchText(searchText)
      displayedOptions(searchText);
    }

  return (
    <div>
      <Grid container rowSpacing={1} columns={16}>
        <Grid item xs={8}>
          <h2>Select employee dropdown</h2>

          <div>
            <Select
              // Disables auto focus on MenuItems and allows TextField to be in focus
              className="dropDown"
              MenuProps={{ autoFocus: false }}
              labelId="search-select-label"
              id="search-select"
              value={selectedOption}
              multiple
              onChange={handleChange}
              onClose={() => setSearchText("")}
              renderValue={(selec) => (
                <div style={{ display: "flex" }}>
                  <AvatarGroup style={{marginTop:"8px"}} max={2}>
                    {selec.map((el) => (
                      <Avatar   key={el.id} alt={el.name} />
                    ))}
                  </AvatarGroup>
                  <p style={{color:"#314363"}} >All employee</p>
                </div>
              )}
            >
              {/* <div className="backGround"> */}
             
                <MenuItem>
                  <TextField
                    // Autofocus on textfield
                    autoFocus
                    className="input"
                    placeholder="Search employee..."
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) => handleSearch(e)}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        e.stopPropagation();
                      }
                    }}
                  />
                </MenuItem>
                {
                result.length > 0 ? result.map((el)=><MenuItem key={el.id} value={el.name} >{el.name} </MenuItem>) : ""
              }
                <MenuItem value="all">
                  {
                    <AvatarGroup max={2}>
                      {data.map((el) => (
                        <Avatar src={el.img} key={el.id} alt={el.name} />
                      ))}
                    </AvatarGroup>
                  }
                  <p className="empName">All employee</p>
                  <Checkbox
                    style={{ position: "absolute", marginLeft: "308px" }}
                    checked={isAllSelected}
                    indeterminate={
                      selectedOption.length > 0 &&
                      selectedOption.length < data.length
                    }
                  />
                </MenuItem>
                <MenuItem value="all-practitioners">
                  <p> All practitioners</p>
                  <Checkbox
                    style={{ position: "absolute", marginLeft: "308px" }}
                    checked={isAllpractiSelected}
                    indeterminate={
                      selectedOption.length > 0 &&
                      selectedOption.length < practi.length
                    }
                  />
                </MenuItem>

                {practi.map((el) => (
                  <>
                    <MenuItem className="practi" key={el.id} value={el.name}>
                   
                      <Avatar key={el.id} alt={el.img} />
                      <p style={{ marginLeft: "16px" }}>{el.name}</p>
                      <Checkbox
                        style={{ position: "absolute", marginLeft: "308px" }}
                        checked={isAllpractiSelected}
                        indeterminate={
                          selectedOption.length > 0 &&
                          selectedOption.length < practi.length
                        }
                      />
                    </MenuItem>
                  </>
                ))}
                <MenuItem value="all-practitioners">
                  <p> All assistants</p>
                  <Checkbox
                    style={{ position: "absolute", marginLeft: "308px" }}
                    checked={isAllpractiSelected}
                    indeterminate={
                      selectedOption.length > 0 &&
                      selectedOption.length < practi.length
                    }
                  />
                </MenuItem>

                
              {/* </div> */}
            </Select>
          </div>
        </Grid>
        {/* Right  */}
        <div>
          <Grid item xs={8}>
            <h2>Date picker</h2>
            <div className="dropDown">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Pick date"
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Grid>
        </div>
      </Grid>
    </div>
  );
}
