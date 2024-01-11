import React, { type FC, useState } from "react";
import Input from "@semcore/ui/input";
import Radio, { RadioGroup } from "@semcore/ui/radio";
import { Layout } from "../components/Layout";
import { SDKCard } from "../components/Widgets/SDKCard";
import { PermissionPoliciesCard } from "../components/Widgets/PermissionPoliciesCard";
import { PushReplaceUrlCards } from "../components/Widgets/PushReplaceUrlCards";
import { AddCallbackCard } from "../components/Widgets/AddCallbackCard";
import { ConfigCard } from "../components/Widgets/ConfigCard";
import { PageHeader } from "../components/PageHeader";
import { Paragraph } from "../components/Paragraph";
import Link from "@semcore/ui/link";
import LinkIcon from "@semcore/ui/icon/LinkExternal/l";

export const Methods: FC = () => {
  const [productIdValues, setProductIdValues] = useState<string[]>([]);
  const [loggingValue, setLoggingValue] = useState(true);

  return (
    <Layout>
      <PageHeader>
        <Link
          href="https://www.semrush.com/apps/docs/js-sdk-reference/overview"
          target="_blank"
          rel="noreferrer"
        >
          <Link.Text>How this app can interact with Semrush?</Link.Text>
          <Link.Addon>
            <LinkIcon />
          </Link.Addon>
        </Link>
      </PageHeader>
      <Paragraph mb={6}>
        JS SDK provides methods for getting information about app, asking user
        to perform specific actions (e.g. to make in-app purchase) or
        interacting with parent window.
      </Paragraph>

      <ConfigCard />

      <PushReplaceUrlCards />

      <AddCallbackCard />

      <SDKCard
        title="requestMainProductPurchase"
        link="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#requestmainproductpurchase"
        description="Opens the pop-up window or redirects to the page
                with the offer to purchase the app or get the trial version.
                This method will not work if your app is free and therefore does
                not have main product. If nothing happens on button click, check
                console."
        buttonText="Request Main Product Purchase"
        buttonTagText="SM.client('requestMainProductPurchase')"
        method={async () => {
          window.SM.client("requestMainProductPurchase");
        }}
      />

      <SDKCard
        title="requestInAppPurchase"
        link="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#requestinapppurchase"
        description="Opens the pop-up window with all in-app products
                purchase options. Try showing the specific in-app using its ID."
        buttonText="Request in-app Purchase"
        buttonTagText="SM.client('requestInAppPurchase', [inputUUID])"
        method={async () => {
          window.SM.client("requestInAppPurchase", productIdValues);
        }}
      >
        <Input size="l" w={300}>
          <Input.Value
            placeholder="(optional) UUID of in-app product"
            onChange={(value: string) => {
              setProductIdValues(value !== "" ? [value] : []);
            }}
          />
        </Input>
      </SDKCard>

      <SDKCard
        title="requestUserFeedback"
        link="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#requestuserfeedback"
        description="Opens the pop-up window with the user feedback form."
        buttonText="Request Feedback"
        buttonTagText="SM.client('requestUserFeedback')"
        method={async () => {
          window.SM.client("requestUserFeedback");
        }}
      />

      <SDKCard
        title="setLogging"
        link="https://www.semrush.com/apps/docs/js-sdk-reference/sm-client#setlogging"
        description="Enables and disables logging in js console. If enabled, all log
                levels will be logged. If disabled, only error logs remain. Try clicking
                several times while looking at the browser console."
        buttonText="Set Logging"
        buttonTagText={`SM.client('setLogging', ${loggingValue})`}
        method={async () => {
          window.SM.client("setLogging", Boolean(loggingValue));
        }}
      >
        <RadioGroup
          size="m"
          value={String(loggingValue)}
          onChange={(v: string) => {
            setLoggingValue(v === "true");
          }}
        >
          <Radio label="true" value={"true"} />
          <Radio mt={2} label="false" value={"false"} />
        </RadioGroup>
      </SDKCard>

      <PermissionPoliciesCard />
    </Layout>
  );
};
