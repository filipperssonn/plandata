"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  ExternalLink,
  CreditCard,
  Check,
  AlertTriangle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { Subscription } from "@/types";
import { PRICING_PLANS } from "@/lib/constants";

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const currentPlan = PRICING_PLANS.find((p) => p.id === subscription.plan_id);
  const upgradePlans = PRICING_PLANS.filter(
    (p) => p.price > (currentPlan?.price || 0)
  );

  const handleUpgrade = async (planId: string) => {
    setLoading(planId);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Checkout failed");
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Kunde inte starta betalning. Försök igen.");
    } finally {
      setLoading(null);
    }
  };

  const handleManageBilling = async () => {
    setLoading("portal");
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || "Portal failed");
      }
    } catch (error) {
      console.error("Portal error:", error);
      alert("Kunde inte öppna faktureringsportalen. Försök igen.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card>
      <CardHeader className="p-8 pb-4">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-primary-50 dark:bg-primary-700/20 rounded-xl">
            <CreditCard className="h-6 w-6 text-primary dark:text-primary-100" />
          </div>
          Prenumeration
        </CardTitle>
        <CardDescription className="text-base">
          Hantera din plan och fakturering
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-4 space-y-8">
        {/* Current Plan */}
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-lg font-medium text-slate-900 dark:text-white">
              Nuvarande plan
            </h4>
            <Badge
              variant={
                subscription.plan_id === "free" ? "secondary" : "default"
              }
              className="text-sm px-3 py-1"
            >
              {currentPlan?.name}
            </Badge>
          </div>
          <p className="text-base text-muted-foreground mb-4">
            {currentPlan?.price === 0
              ? "Gratis"
              : `${currentPlan?.price} kr/månad`}
          </p>
          <div className="space-y-2">
            {currentPlan?.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-base text-slate-900 dark:text-slate-200"
              >
                <Check className="h-5 w-5 text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Usage */}
        <div>
          <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
            Användning denna månad
          </h4>
          <div className="flex items-center gap-5">
            <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    (subscription.monthly_uploads_used /
                      subscription.monthly_uploads_limit) *
                      100,
                    100
                  )}%`,
                }}
              />
            </div>
            <span className="text-base font-medium text-slate-900 dark:text-white">
              {subscription.monthly_uploads_used}/
              {subscription.monthly_uploads_limit} uploads
            </span>
          </div>
        </div>

        {/* Upgrade Options */}
        {upgradePlans.length > 0 && (
          <div>
            <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
              Uppgradera
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              {upgradePlans.map((plan) => (
                <div
                  key={plan.id}
                  className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-medium text-slate-900 dark:text-white">
                      {plan.name}
                    </span>
                    <span className="text-base text-muted-foreground">
                      {plan.price} kr/mån
                    </span>
                  </div>
                  <Button
                    className="w-full text-base"
                    onClick={() => handleUpgrade(plan.id)}
                    disabled={loading !== null}
                  >
                    {loading === plan.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      `Välj ${plan.name}`
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manage Billing */}
        {subscription.stripe_customer_id && (
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleManageBilling}
              disabled={loading !== null}
              className="text-base"
            >
              {loading === "portal" ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ExternalLink className="mr-2 h-5 w-5" />
              )}
              Hantera fakturering
            </Button>
          </div>
        )}

        {/* Cancel Subscription */}
        {subscription.plan_id !== "free" &&
          subscription.stripe_subscription_id && (
            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-medium text-slate-900 dark:text-white mb-3">
                Avsluta prenumeration
              </h4>
              <Alert className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">
                  Om du avslutar din prenumeration kommer du att behålla
                  tillgång till din nuvarande plan fram till slutet av
                  faktureringsperioden. Därefter återgår ditt konto till
                  gratisplanen.
                </AlertDescription>
              </Alert>
              <Button
                variant="outline"
                size="lg"
                onClick={handleManageBilling}
                disabled={loading !== null}
                className="text-base text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300"
              >
                {loading === "portal" && (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                )}
                Avsluta prenumeration
              </Button>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
