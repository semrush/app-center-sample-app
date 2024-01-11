import React, { type FC, type PropsWithChildren, useState } from "react";
import Card from "@semcore/ui/card";
import Link from "@semcore/ui/link";
import LinkIcon from "@semcore/ui/icon/LinkExternal/m";
import { Flex } from "@semcore/ui/flex-box";
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

  const handleClick = (): void => {
    setSpinnerOn(true);
    method()
      .then()
      .catch((error: Error) => {
        console.error(error);
      })
      .finally(() => {
        setSpinnerOn(false);
      });
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
