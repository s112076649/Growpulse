import React from "react";
import Link from "next/link";
import { useGrowPulse } from "@growpulse/growpulse-react";
import { ExperimentInterfaceStringDates } from "back-end/types/experiment";
import { AppFeatures } from "@/types/app-features";
import { useUser } from "@/services/UserContext";
import ActivityList from "@/components/ActivityList";
import ExperimentList from "@/components/Experiment/ExperimentList";
import ExperimentGraph from "@/components/Experiment/ExperimentGraph";
import PremiumTooltip from "@/components/Marketing/PremiumTooltip";
import Frame from "@/components/Radix/Frame";
import styles from "./Dashboard.module.scss";
import IdeasFeed from "./IdeasFeed";
import NorthStar from "./NorthStar";
import ExperimentImpact from "./ExperimentImpact";

export interface Props {
  experiments: ExperimentInterfaceStringDates[];
}

export default function Dashboard({ experiments }: Props) {
  const { name, hasCommercialFeature } = useUser();
  const growthbook = useGrowPulse<AppFeatures>();

  const nameMap = new Map<string, string>();
  experiments.forEach((e) => {
    nameMap.set(e.id, e.name);
  });

  const experimentImpactWidget = (
    <div className="col-xl-13 mb-4">
      <Frame className="overflow-auto">
        {hasCommercialFeature("experiment-impact") ? (
          <ExperimentImpact experiments={experiments} />
        ) : (
          <div className="pt-2">
            <div className="row align-items-start mb-4">
              <div className="col-lg-auto">
                <h3 className="mt-2">Experiment Impact</h3>
              </div>
            </div>

            <PremiumTooltip commercialFeature="experiment-impact">
              Experiment Impact is available to Enterprise customers
            </PremiumTooltip>
          </div>
        )}
      </Frame>
    </div>
  );

  const showImpactNearTop = growthbook.isOn("show-impact-near-top");

  return (
    <>
      <div className={"container-fluid dashboard p-3 " + styles.container}>
        <h1>Hello {name}</h1>
        
        {/* 学习版提示 */}
        <div className="alert alert-info mt-3 mb-4">
          <h4 className="alert-heading">GrowPulse学习版</h4>
          <p>
            本版本<strong>严格仅供个人学习和教育研究使用</strong>，启用了以下功能：
          </p>
          <ul>
            <li>
              <strong>功能管理</strong>：计划功能标志、团队管理
            </li>
            <li>
              <strong>分析功能</strong>：回归调整、指标人群、多指标查询
            </li>
            <li>
              <strong>监控功能</strong>：审计日志
            </li>
          </ul>
          <p className="mb-0">
            <small className="text-danger">法律声明：不得用于任何商业用途。所有功能的知识产权归原开发者所有。详见docs/learning/LEGAL_DISCLAIMER.md</small>
          </p>
        </div>
        
        {/* 选定功能提示 */}
        <div className="alert alert-info mt-3 mb-4">
          <h4 className="alert-heading">启用的高级功能</h4>
          <p>
            本版本已启用以下学习和研究用途的高级功能：
          </p>
          <ul>
            <li>
              <strong>计划功能标志</strong> - 设置功能标志的自动启用/禁用时间
            </li>
            <li>
              <strong>审计日志</strong> - 跟踪系统中的重要操作和变更
            </li>
            <li>
              <strong>团队管理</strong> - 创建和管理团队，分配权限和责任
            </li>
          </ul>
          <p className="mb-0">
            详情请参考选定功能说明文档
          </p>
        </div>
        
        <div className="row">
          <div className="col-md-12">
            <NorthStar experiments={experiments} />
          </div>
        </div>

        {showImpactNearTop ? experimentImpactWidget : null}
        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-8">
            <Frame className="fixed-height" height="100%">
              <ExperimentGraph
                resolution={"month"}
                num={12}
                height={220}
                initialShowBy={"all"}
              />
            </Frame>
          </div>
          <div className="col-md-4">
            <Frame className="overflow-auto fixed-height" height="100%">
              <h4 className="">
                Recent Activity{" "}
                <Link href="/activity" className="float-right h6">
                  See all
                </Link>
              </h4>
              <ActivityList num={3} />
            </Frame>
          </div>
          <div className="col-md-4 col-xl-6">
            <Frame className="overflow-auto fixed-height" height="100%">
              <h4>
                Running Experiments
                <Link href={`/experiments`} className="float-right h6">
                  See all
                </Link>
              </h4>
              <ExperimentList
                num={5}
                status={"running"}
                experiments={experiments}
              />
            </Frame>
          </div>
          <div className="col-md-4 col-xl-6">
            <Frame className="overflow-auto fixed-height" height="100%">
              <h4>
                Recent Ideas{" "}
                <Link href={`/ideas`} className="float-right h6">
                  See all
                </Link>
              </h4>
              <IdeasFeed num={5} />
            </Frame>
          </div>
        </div>
        {!showImpactNearTop ? experimentImpactWidget : null}
      </div>
    </>
  );
}
