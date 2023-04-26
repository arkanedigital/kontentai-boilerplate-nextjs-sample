import React from 'react';

interface LoweCaseUrlLinkProps {
  to: string;
  className?: string;
  target?: string;
  children: React.ReactNode;
}

const LowerCaseUrlLink: React.FC<LoweCaseUrlLinkProps> = (props) => {
  if (/^https?:\/\//.test(props.to) || /^mailto:/.test(props.to)) {
    return (
      <a href={props.to.toLowerCase()} {...props}>
        {props.children}
      </a>
    );
  }
  
  // @TODO: fix this react-router-dom issue
  // return <Link {...props} to={props.to.toLowerCase()} />;
  return <a href={props.to.toLowerCase().replace('/en-us', '')}>{props.children}</a>;
};

export default LowerCaseUrlLink;
