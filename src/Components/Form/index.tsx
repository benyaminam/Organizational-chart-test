import { Input, Tabs } from "antd";
import React from "react";
import ErrorBoundry from "../../ErrorBoundry";
import ActionBar from "../ActionBar";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";
import UsersList from "./user-autocomplete";
import { FormSubmitType, NodeType } from "../../types";

interface Props {
  item: NodeType | [];
  onFormSubmit: (data: FormSubmitType) => void;
  setSelectedItem: React.Dispatch<any>;
}

function Form({ item, onFormSubmit, setSelectedItem }: Props) {
  return (
    <div className="detail">
      <div>
        <Tabs>
          <Tabs.TabPane tab="اطلاعات اصلی" key="item-1">
            <div className="form-content">
              <BasicInformation
                setSelectedItem={setSelectedItem}
                selectedNode={item}
                onSubmit={onFormSubmit}
              />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="دسترسی ها" key="item-2">
            <div className="form-content">
              <ErrorBoundry>
                <Accesses initialValue={item} />
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={[]} />
    </div>
  );
}
export default Form;
