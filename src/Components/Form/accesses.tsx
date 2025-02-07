import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { getAccessList } from "../../transportLayer";

interface Props {
  initialValue?: any;
}

function Accesses({ initialValue }: Props) {
  const [options, setOptions] = useState([]);

  const fetchAccessList = async () => {
    const result = await getAccessList();
    setOptions(
      result.map((option, index) => {
        return { ...option, value: index };
      })
    );
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  function handleOnChange() {}

  return <Checkbox.Group options={options as any} onChange={handleOnChange} />;
}
export default Accesses;
