import type React from 'react';

interface UserInfoItemProps {
  label: string;
  value: string;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => (
  <p>
    <strong className="">{label}: </strong>
    {value}
  </p>
);

export default UserInfoItem;
