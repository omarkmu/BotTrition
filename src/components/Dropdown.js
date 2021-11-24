import React from 'react';
import {
  DropdownWrapper,
  StyledSelect,
  StyledOption,
  StyledLabel,
  StyledButton,
} from '../styles';

export function Dropdown(props) {
  const {
    action, formLabel, children, buttonText, onChange,
  } = props;
  return (
    <DropdownWrapper action={action} onChange={onChange}>
      <StyledLabel htmlFor="services">{formLabel}</StyledLabel>
      <StyledSelect id="services" name="services">
        {children}
      </StyledSelect>
      <StyledButton type="submit" value={buttonText} />
    </DropdownWrapper>
  );
}

export function Option(props) {
  const { selected, value } = props;
  return <StyledOption selected={selected}>{value}</StyledOption>;
}
