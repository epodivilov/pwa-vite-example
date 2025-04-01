import styled from '@emotion/styled';
import { CSSProperties } from 'react';

const ToolbarContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #e0e0e0;
  height: 56px;
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1a1a1a;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  font-size: 20px;
`;

interface ToolbarProps {
  title: string;
  onBackClick?: () => void;
  onInfoClick?: () => void;
  style?: CSSProperties;
}

const Toolbar = ({ title, onBackClick, onInfoClick, style }: ToolbarProps) => {
  return (
    <ToolbarContainer style={style}>
      <IconButton onClick={onBackClick}>←</IconButton>
      <Title>{title}</Title>
      <ActionButtons>
        <IconButton onClick={onInfoClick}>ⓘ</IconButton>
      </ActionButtons>
    </ToolbarContainer>
  );
};

export default Toolbar;