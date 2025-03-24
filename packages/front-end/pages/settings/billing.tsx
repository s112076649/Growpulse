import { FC, useEffect, useState } from "react";
import { LicenseInterface } from "shared/enterprise";
import SubscriptionInfo from "@/components/Settings/SubscriptionInfo";
import UpgradeModal from "@/components/Settings/UpgradeModal";
import { useUser } from "@/services/UserContext";
import { useAuth } from "@/services/auth";
import usePermissionsUtil from "@/hooks/usePermissionsUtils";
import PaymentInfo from "@/enterprise/components/Billing/PaymentInfo";
import { Heading, Text } from "@/components/ui/typography";

const BillingPage: FC = () => {
  const [upgradeModal, setUpgradeModal] = useState(false);

  const permissionsUtil = usePermissionsUtil();

  const { accountPlan, subscription, canSubscribe } = useUser();

  const { apiCall } = useAuth();
  const { refreshOrganization } = useUser();

  useEffect(() => {
    const refreshLicense = async () => {
      const res = await apiCall<{
        status: number;
        license: LicenseInterface;
      }>(`/license`, {
        method: "GET",
      });

      if (res.status !== 200) {
        throw new Error("There was an error fetching the license");
      }
      refreshOrganization();
    };

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      // TODO: Get rid of the "org" route, once all license data has been moved off the orgs
      if (urlParams.get("refreshLicense") || urlParams.get("org")) {
        refreshLicense();
      }
    }
  }, [apiCall, refreshOrganization]);

  if (accountPlan === "enterprise") {
    return (
      <div className="container pagecontents">
        <div className="alert alert-info">
          This page is not available for enterprise customers. Please contact
          your account rep for any billing questions or changes.
        </div>
      </div>
    );
  }

  if (!permissionsUtil.canManageBilling()) {
    return (
      <div className="container pagecontents">
        <div className="alert alert-danger">
          You do not have access to view this page.
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid pagecontents">
      {upgradeModal && (
        <UpgradeModal
          close={() => setUpgradeModal(false)}
          reason=""
          source="billing-free"
          commercialFeature={null}
        />
      )}
      <Heading mb="4" as="h1">
        Billing
      </Heading>

      <div className="alert alert-success mb-5">
        <strong>GrowPulse Pro已解锁！</strong> 所有高级功能已全部解锁，无需付费订阅。
      </div>

      <Text as="p" mb="5">
        您正在使用的GrowPulse版本已经包含所有专业功能，无需支付任何费用。
      </Text>

      <div className="appbox p-3 border">
        {subscription?.status ? (
          <>
            <PaymentInfo />
            <SubscriptionInfo />
          </>
        ) : canSubscribe ? (
          <div className="bg-white p-3">
            <div className="alert alert-warning mb-0">
              <div className="d-flex align-items-center">
                <div>
                  You are currently on the <strong>Starter Plan</strong>.
                </div>
                <button
                  className="btn btn-primary ml-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    setUpgradeModal(true);
                  }}
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>
            Contact <a href="mailto:sales@growthbook.io">sales@growthbook.io</a>{" "}
            to make changes to your subscription plan.
          </p>
        )}
      </div>
    </div>
  );
};
export default BillingPage;
