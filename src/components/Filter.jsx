import Select from "./Select";
import { statusOpt, typeOpt, sortOpt } from "./../constants/index";
import SubmitButton from "./SubmitButton";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setLoading, setError, setJobs } from "../app/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState();
  const [sort, setSort] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();

  const dispatch = useDispatch();

  //debounce usage

  useEffect(() => {
    if (text === undefined) return;

    const timer = setTimeout(setDebouncedText(text), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [text]);

  useEffect(() => {
    const sortParam =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort === "Newest" || sort === "Oldest"
        ? "date"
        : undefined;

    const orderParams =
      sort === "a-z"
        ? "asc"
        : sort === "z-a"
        ? "desc"
        : sort === "Newest"
        ? "desc"
        : sort === "Oldest"
        ? "asc"
        : undefined;

    const params = {
      q: text,
      _sort: sortParam,
      _order: "",
      type: type || undefined,
      status: status || undefined,
    };

    dispatch(setLoading());

    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, sort]);

  const handleReset = (e) => {
    e.preventDefault(),
      //reset state
      setText(),
      setDebouncedText(),
      setSort(),
      setStatus(),
      setType(),
      //reset inputs
      e.target.reset();
  };

  return (
    <div className="filter-sec">
      <h2>Filter Form</h2>

      <form onSubmit={handleReset}>
        <div>
          <label htmlFor="Search by Company">Job Title</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <Select
          label={"Status"}
          options={statusOpt}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label={"Type"}
          options={typeOpt}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label={"Sort"}
          options={sortOpt}
          handleChange={(e) => setSort(e.target.value)}
        />
        <div>
          <SubmitButton text={"Reset Filters"} />
        </div>
      </form>
    </div>
  );
};

export default Filter;
