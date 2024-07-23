import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { TaskState, TaskActions } from "../types";
import React from "react";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import CardTask from "./CardTask";

type TaskListComponentProps = {
  state: TaskState;
  dispatch: React.Dispatch<TaskActions>;
};

export default function TaskListComponent({
  state,
  dispatch,
}: TaskListComponentProps) {
  return (
    <>
      {state?.tasks.length! > 0 ? (
        <div className="p-5">
            <h2>In work:</h2>
            <div className="flex flex-wrap p-5 justify-center items-center space-x-3">
                {state.tasks.filter(t => t.state === "in work").map(t=>(
                    <CardTask key={t.id} state={t} dispatch={dispatch}/>
                ))}
            </div>
            <h2>Postponed:</h2>
            <div className="flex flex-wrap p-5 justify-center items-center space-x-3">
                {state.tasks.filter(t => t.state === "postponed").map(t=>(
                    <CardTask key={t.id} state={t} dispatch={dispatch}/>
                ))}
            </div>
            <h2>Completed:</h2>
            <div className="flex flex-wrap p-5 justify-center items-center space-x-3">
                {state.tasks.filter(t => t.state === "completed").map(t=>(
                    <CardTask key={t.id} state={t} dispatch={dispatch}/>
                ))}
            </div>
            <h2>Canceled:</h2>
            <div className="flex flex-wrap p-5 justify-center items-center space-x-3">
                {state.tasks.filter(t => t.state === "canceled").map(t=>(
                    <CardTask key={t.id} state={t} dispatch={dispatch}/>
                ))}
            </div>
        </div>
      ) : (
        <div className="p-5 text-center text-2xl font-medium">
          <FontAwesomeIcon className="text-pink-500" icon={faHeartBroken}/>{" "}You don't have tasks yet
        </div>
      )}
    </>
  );
}
