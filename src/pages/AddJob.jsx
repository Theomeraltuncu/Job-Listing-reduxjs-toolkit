import { v4 } from "uuid";
import AutoInput from "../components/AutoInput";
import { statusOpt, typeOpt } from "../constants";
import { toast } from "react-toastify";
import api from "../utils/api";
import { createJob } from "../app/slices/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import SubmitButton from "../components/SubmitButton";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //send form

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    //create object from input data
    const newJobData = Object.fromEntries(formData.entries());

    //add date and id
    newJobData.id = v4();
    newJobData.date = Date.now();

    //api
    api
      .post("/jobs", newJobData)
      .then(() => {
        toast.success("New position added successfully");
        dispatch(createJob(newJobData));
        navigate("/");
      })
      .catch(() => {
        toast.error("Error Occured");
      });

    //store

    //notification

    //navgate to mainpage
  };
  return (
    <div className="add-page">
      <section className="container">
        <h2>Add new </h2>
        <form onSubmit={handleSubmit}>
          <AutoInput label={"Position"} name={"position"} />
          <AutoInput label={"Company"} name={"company"} />
          <AutoInput label={"Location"} name={"location"} />
          <Select label={"Status"} options={statusOpt} name={"status"} />
          <Select label={"Type"} options={typeOpt} name={"type"} />

          {/* <div>
            <label>Status</label>
            <select name="status" required>
              <option selected hidden value="">Select</option>
              {statusOpt.map((i) => (<option value={i}>{i}</option>))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select name="type" required>
              <option selected hidden value="">Select</option>
              {typeOpt.map((i) => (<option value={i}>{i}</option>))}
            </select>
          </div> */}

          <div>
            <SubmitButton text={"Create"} />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
