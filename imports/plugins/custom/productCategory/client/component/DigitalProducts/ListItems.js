import React from "react";
import { Router } from "/client/api";

const generateItems = list => {
  return list.map(item => {
    return (
      <a
        key={item.name}
        href="#"
        onClick={e => {
          e.preventDefault();
          Router.go(`/category/${item.label}`);
        }}
        className="list-group-item text-capitalize"
      >
        <i className="fa fa-chevron-circle-right" aria-hidden="true" /> {item.name}
      </a>
    );
  });
};

const listArray = [
  { name: "e-books", label: "e-books" },
  { name: "audio books", label: "audio books" },
  { name: "music", label: "music" },
  { name: "research", label: "others" },
  { name: "tutorials", label: "others" },
  { name: "software", label: "others" },
  { name: "blueprints", label: "blueprints" },
  { name: "plans", label: "others" },
  { name: "tickets", label: "others" },
  { name: "photography", label: "photography" }
];
const ListItems = () => {
  return (
    <div className="col-lg-2 col-md-3 col-xs-12 col-sm-3 p-10">
      <div className="list-group">
        <a className="list-group-item header">Digital Products</a>
        {generateItems(listArray)}
      </div>
    </div>
  );
};

export default ListItems;
