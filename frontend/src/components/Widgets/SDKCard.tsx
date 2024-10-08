import React, { type FC, type PropsWithChildren, useState } from "react";
import Card from "intergalactic/card";
import Link from "intergalactic/link";
import LinkIcon from "intergalactic/icon/LinkExternal/m";
import { Flex } from "intergalactic/flex-box";
import { WidgetButton } from "../WidgetButton";

interface Props {
  title: string;
  link: string;
  description: string;
  buttonText: string;
  buttonTagText: string;
  method: () => Promise<void>;
}

export const SDKCard: FC<PropsWithChildren<Props>> = ({
  children,
  title,
  link,
  description,
  buttonText,
  buttonTagText,
  method,
}) => {
  const [spinnerOn, setSpinnerOn] = useState(false);

  const handleClick = async (): Promise<void> => {
    try {
      setSpinnerOn(true);
      await method();
    } catch (error) {
      console.error((error as Error).message);
    } finally {
      setSpinnerOn(false);
    }
  };

  return (
    <>
      <Card mt={3}>
        <Card.Header>
          <Card.Title>
            <Link href={link} target="_blank" rel="noreferrer">
              <Link.Text>{title}</Link.Text>
              <Link.Addon>
                <LinkIcon />
              </Link.Addon>
            </Link>
          </Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card.Header>
        <Card.Body>
          <Flex direction="column">
            {children}
            <WidgetButton
              buttonText={buttonText}
              codeText={buttonTagText}
              onClick={handleClick}
              loading={spinnerOn}
              disabled={spinnerOn}
              mt={children ? 2 : 0}
            />
          </Flex>
        </Card.Body>
      </Card>
    </>
  );
};
