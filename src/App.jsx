import { useState } from 'react'
import {
  LayoutDashboard,
  MessageCircle,
  SearchCheck,
  UsersRound,
  Bot,
  Send,
  ArrowRight,
  Check,
  Clock3,
  AlertTriangle,
  ShieldCheck,
  UserCheck,
  Package,
  Truck,
  History,
  FileCheck,
  Database,
  CreditCard,
  Brain,
  UserRound,
} from 'lucide-react'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [complaint, setComplaint] = useState('')
  const [submittedComplaint, setSubmittedComplaint] = useState('')
  const [isInvestigating, setIsInvestigating] = useState(false)
  const [investigationStep, setInvestigationStep] = useState(0)
  const [selectedCase, setSelectedCase] = useState('#10482')

  const handleSendComplaint = () => {
    if (!complaint.trim() || isInvestigating) return

    setSubmittedComplaint(complaint)
    setComplaint('')
    setIsInvestigating(true)
    setInvestigationStep(1)

    setTimeout(() => {
      setInvestigationStep(2)
    }, 800)

    setTimeout(() => {
      setInvestigationStep(3)
    }, 1600)

    setTimeout(() => {
      setInvestigationStep(4)
    }, 2400)

    setTimeout(() => {
      setInvestigationStep(5)
    }, 3200)

    setTimeout(() => {
      setIsInvestigating(false)
      setInvestigationStep(6)
    }, 4000)
  }

  const handleStartSupport = () => {
    setActivePage('Customer Support')
  }

  const getStepClass = (stepNumber) => {
    if (investigationStep === stepNumber) return 'active'
    if (investigationStep > stepNumber) return 'completed'
    return 'pending'
  }

  const getStepIcon = (stepNumber) => {
    if (investigationStep > stepNumber) {
      return <Check size={11} />
    }

    if (investigationStep === stepNumber) {
      return '...'
    }

    return ''
  }

  const investigationCases = [
    {
      id: '#10482',
      customer: 'Customer A',
      issue: 'Delayed delivery',
      order: '#78421',
      stage: 'Policy Check',
      progress: 82,
      status: 'Investigating',
      statusClass: 'investigating',
    },
    {
      id: '#10481',
      customer: 'Customer B',
      issue: 'Damaged item',
      order: '#78420',
      stage: 'AI Review',
      progress: 94,
      status: 'Awaiting Review',
      statusClass: 'waiting',
    },
    {
      id: '#10480',
      customer: 'Customer C',
      issue: 'Duplicate payment',
      order: '#78419',
      stage: 'Evidence Check',
      progress: 68,
      status: 'Escalated',
      statusClass: 'escalated',
    },
  ]

  const investigationStages = [
    {
      title: 'Customer Verification',
      description: 'Customer identity confirmed',
      icon: UserCheck,
    },
    {
      title: 'Order Lookup',
      description: 'Order #78421 located',
      icon: Package,
    },
    {
      title: 'Delivery Check',
      description: 'Express delivery · 3 days late',
      icon: Truck,
    },
    {
      title: 'Support History',
      description: '1 previous interaction found',
      icon: History,
    },
    {
      title: 'Policy Check',
      description: 'Shipping refund policy reviewed',
      icon: FileCheck,
    },
    {
      title: 'Evidence Collected',
      description: 'Evidence sufficient for decision',
      icon: Database,
    },
  ]

  const renderDashboard = () => (
    <div className="dashboard-page">
      <div className="welcome-section">
        <div>
          <p className="eyebrow">AUTONOMOUS CUSTOMER SUPPORT</p>

          <h1>Resolve customer issues intelligently.</h1>

          <p>
            ResolveAI investigates customer issues, reasons over evidence,
            takes action, and escalates when human review is required.
          </p>
        </div>

        <button className="primary-button" onClick={handleStartSupport}>
          <MessageCircle size={17} />
          Start Support Case
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Active Cases</span>
            <strong>12</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Check size={18} />
          </div>

          <div>
            <span>Resolved Cases</span>
            <strong>148</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <AlertTriangle size={18} />
          </div>

          <div>
            <span>Escalated Cases</span>
            <strong>18</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <ShieldCheck size={18} />
          </div>

          <div>
            <span>Resolution Rate</span>
            <strong>89%</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">CASE MANAGEMENT</p>
              <h3>Recent Cases</h3>
            </div>

            <span className="panel-link">View all</span>
          </div>

          <div className="case-list">
            <div className="case-row">
              <div>
                <strong>#10482</strong>
                <span>Delayed delivery</span>
              </div>

              <span className="case-status resolved">
                Resolved
              </span>
            </div>

            <div className="case-row">
              <div>
                <strong>#10481</strong>
                <span>Damaged order</span>
              </div>

              <span className="case-status investigating">
                Investigating
              </span>
            </div>

            <div className="case-row">
              <div>
                <strong>#10480</strong>
                <span>Duplicate payment</span>
              </div>

              <span className="case-status escalated">
                Escalated
              </span>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">AI ACTIVITY</p>
              <h3>Autonomous Workflow</h3>
            </div>
          </div>

          <div className="activity-list">
            <div className="activity-item">
              <Check size={15} />

              <div>
                <strong>Policy checked</strong>
                <span>Case #10482</span>
              </div>
            </div>

            <div className="activity-item">
              <Check size={15} />

              <div>
                <strong>AI decision generated</strong>
                <span>Refund approved</span>
              </div>
            </div>

            <div className="activity-item">
              <Check size={15} />

              <div>
                <strong>Refund initiated</strong>
                <span>Case #10482</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCustomerSupport = () => (
    <div className="support-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">CUSTOMER SUPPORT</p>

          <h1>How can we help?</h1>

          <p>
            Describe your issue and ResolveAI will investigate it.
          </p>
        </div>

        <div className="ai-status">
          <span></span>
          AI ONLINE
        </div>
      </div>

      <div className="support-main-grid">
        <div className="support-card">
          <div className="support-card-header">
            <div className="ai-avatar">
              <Bot size={18} />
            </div>

            <div>
              <strong>ResolveAI</strong>
              <span>Autonomous Support Agent</span>
            </div>
          </div>

          <div className="chat-area">
            <div className="message ai-message">
              <div className="message-avatar">
                <Bot size={15} />
              </div>

              <div className="message-content">
                <strong>ResolveAI</strong>

                <p>
                  Hi! I'm ResolveAI. Tell me what happened and I'll
                  investigate your issue and find the best resolution.
                </p>
              </div>
            </div>

            {submittedComplaint && (
              <div className="message customer-message">
                <div className="message-content">
                  <strong>You</strong>

                  <p>{submittedComplaint}</p>
                </div>
              </div>
            )}

            {submittedComplaint && !isInvestigating && (
              <div className="message ai-message">
                <div className="message-avatar">
                  <Bot size={15} />
                </div>

                <div className="message-content">
                  <strong>ResolveAI</strong>

                  <p>
                    I've completed my investigation. The available
                    evidence indicates that this case qualifies for
                    an automatic refund.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="support-input">
            <input
              type="text"
              placeholder="Describe your issue..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendComplaint()
                }
              }}
            />

            <button
              onClick={handleSendComplaint}
              disabled={isInvestigating}
              aria-label="Send complaint"
            >
              <Send size={17} />
            </button>
          </div>
        </div>

        <div className="investigation-card">
          <div className="investigation-header">
            <div>
              <p className="eyebrow">AI INVESTIGATION</p>

              <h3>
                {!submittedComplaint
                  ? 'Waiting for customer issue'
                  : isInvestigating
                    ? 'Investigating case #10482'
                    : 'Analysis complete — case #10482'}
              </h3>
            </div>

            <span className="investigating-badge">
              {!submittedComplaint
                ? '● Ready'
                : isInvestigating
                  ? '● Investigating'
                  : '✓ Analysis Complete'}
            </span>
          </div>

          <div className="investigation-steps">
            <div className={`step ${getStepClass(1)}`}>
              <span>{getStepIcon(1)}</span>

              <div>
                <strong>Customer verified</strong>

                <p>
                  {investigationStep > 1
                    ? 'Customer identity confirmed'
                    : investigationStep === 1
                      ? 'Verifying customer...'
                      : 'Waiting to verify customer'}
                </p>
              </div>
            </div>

            <div className={`step ${getStepClass(2)}`}>
              <span>{getStepIcon(2)}</span>

              <div>
                <strong>Order found</strong>

                <p>
                  {investigationStep > 2
                    ? 'Order #78421 · ₹2,499 · Delivered'
                    : investigationStep === 2
                      ? 'Checking order information...'
                      : 'Waiting for order lookup'}
                </p>
              </div>
            </div>

            <div className={`step ${getStepClass(3)}`}>
              <span>{getStepIcon(3)}</span>

              <div>
                <strong>Delivery checked</strong>

                <p>
                  {investigationStep > 3
                    ? 'Delivered · 3 days late · Express delivery'
                    : investigationStep === 3
                      ? 'Checking delivery status...'
                      : 'Waiting for delivery check'}
                </p>
              </div>
            </div>

            <div className={`step ${getStepClass(4)}`}>
              <span>{getStepIcon(4)}</span>

              <div>
                <strong>Support history checked</strong>

                <p>
                  {investigationStep > 4
                    ? '1 previous support interaction found'
                    : investigationStep === 4
                      ? 'Checking support history...'
                      : 'Waiting for support history'}
                </p>
              </div>
            </div>

            <div className={`step ${getStepClass(5)}`}>
              <span>{getStepIcon(5)}</span>

              <div>
                <strong>Refund policy checked</strong>

                <p>
                  {investigationStep > 5
                    ? 'Eligible under delayed-delivery refund policy'
                    : investigationStep === 5
                      ? 'Checking refund policy...'
                      : 'Waiting for policy verification'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="decision-box support-decision">
        <div className="decision-header">
          <div>
            <p className="eyebrow">AI DECISION & RESOLUTION</p>

            <h2>
              {!submittedComplaint
                ? 'No active case'
                : isInvestigating
                  ? 'Analyzing evidence...'
                  : 'Refund approved'}
            </h2>
          </div>

          {submittedComplaint && !isInvestigating && (
            <div className="decision-approved">
              <Check size={15} />
              APPROVED
            </div>
          )}
        </div>

        {!submittedComplaint && (
          <>
            <p>
              Submit a customer issue to start the autonomous
              investigation.
            </p>

            <div className="decision-status waiting">
              Waiting for complaint
            </div>
          </>
        )}

        {submittedComplaint && isInvestigating && (
          <>
            <p>
              ResolveAI is checking customer data, order information,
              delivery status, support history, and refund policy.
            </p>

            <div className="progress-bar">
              <div
                style={{
                  width: `${Math.min(
                    (investigationStep / 5) * 100,
                    100
                  )}%`,
                }}
              ></div>
            </div>

            <div className="decision-status investigating">
              Investigation in progress
            </div>
          </>
        )}

        {submittedComplaint && !isInvestigating && (
          <>
            <p>
              Evidence matches the refund policy. ResolveAI determined
              that the customer is eligible for an automatic refund.
            </p>

            <div className="decision-flow">
              <div className="decision-action">
                <Check size={15} />
                <span>Refund Shipping Fee</span>
              </div>

              <ArrowRight
                size={18}
                className="decision-arrow"
              />

              <div className="decision-action">
                <Check size={15} />
                <span>Action Completed</span>
              </div>

              <ArrowRight
                size={18}
                className="decision-arrow"
              />

              <div className="decision-action">
                <Check size={15} />
                <span>Verification Passed</span>
              </div>
            </div>

            <div className="resolution-status">
              <div>
                <span>Action Status</span>
                <strong>COMPLETED</strong>
              </div>

              <div>
                <span>Verification</span>
                <strong>VERIFIED</strong>
              </div>

              <div>
                <span>Case Status</span>
                <strong>RESOLVED</strong>
              </div>
            </div>

            <div className="customer-resolution-message">
              <span>Customer Response</span>

              <p>
                Your express delivery refund has been initiated
                successfully.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )

  const renderInvestigations = () => {
    const caseState = {
      '#10482': {
        completedThrough: 3,
        current: 4,
      },

      '#10481': {
        completedThrough: 5,
        current: null,
      },

      '#10480': {
        completedThrough: 3,
        current: 5,
      },
    }

    const currentState =
      caseState[selectedCase] || caseState['#10482']

    return (
      <div className="dashboard-page investigations-page">

        <div className="page-heading">
          <div>
            <p className="eyebrow">INVESTIGATIONS</p>

            <h1>AI Investigations</h1>

            <p>
              Monitor how ResolveAI investigates customer cases before
              making a decision.
            </p>
          </div>

          <div className="ai-status">
            <span></span>
            AI ENGINE ACTIVE
          </div>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">
              <SearchCheck size={18} />
            </div>

            <div>
              <span>Active Investigations</span>
              <strong>12</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Clock3 size={18} />
            </div>

            <div>
              <span>Awaiting Review</span>
              <strong>4</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Check size={18} />
            </div>

            <div>
              <span>Completed</span>
              <strong>148</strong>
            </div>
          </div>

        </div>

        <section className="investigation-panel case-queue-panel">

          <div className="panel-header">
            <div>
              <p className="eyebrow">CASE QUEUE</p>
              <h3>Active Investigations</h3>
            </div>

            <span className="active-count">
              12 ACTIVE
            </span>
          </div>

          <div className="case-table-wrapper">
            <table className="case-table">

              <thead>
                <tr>
                  <th>CASE</th>
                  <th>CUSTOMER</th>
                  <th>ISSUE</th>
                  <th>ORDER</th>
                  <th>CURRENT STAGE</th>
                  <th>PROGRESS</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {investigationCases.map((item) => (
                  <tr
                    key={item.id}
                    className={
                      selectedCase === item.id
                        ? 'selected-case'
                        : ''
                    }
                    onClick={() => setSelectedCase(item.id)}
                  >

                    <td>
                      <button
                        className="case-id-button"
                        type="button"
                      >
                        {item.id}
                      </button>
                    </td>

                    <td>{item.customer}</td>

                    <td>{item.issue}</td>

                    <td>{item.order}</td>

                    <td>
                      <span className="stage-text">
                        {item.stage}
                      </span>
                    </td>

                    <td>
                      <div className="progress-cell">

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${item.progress}%`,
                            }}
                          />
                        </div>

                        <span>
                          {item.progress}%
                        </span>

                      </div>
                    </td>

                    <td>
                      <span
                        className={`case-status ${item.statusClass}`}
                      >
                        {item.status}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </section>

        <div className="investigation-grid">

          <section className="investigation-panel workflow-panel">

            <div className="panel-header">

              <div>
                <p className="eyebrow">
                  INVESTIGATION WORKFLOW
                </p>

                <h3>
                  Case {selectedCase}
                </h3>
              </div>

              <span className="live-badge">
                ● LIVE
              </span>

            </div>

            <div className="timeline">

              {investigationStages.map((stage, index) => {
                const Icon = stage.icon

                const isCompleted =
                  index <= currentState.completedThrough

                const isCurrent =
                  index === currentState.current

                const status = isCompleted
                  ? 'COMPLETED'
                  : isCurrent
                    ? 'IN PROGRESS'
                    : 'PENDING'

                return (
                  <div
                    key={stage.title}
                    className={`timeline-item ${isCompleted
                      ? 'timeline-complete'
                      : isCurrent
                        ? 'timeline-current'
                        : 'timeline-pending'
                      }`}
                  >

                    <div className="timeline-icon">

                      {isCompleted ? (
                        <Check size={14} />
                      ) : isCurrent ? (
                        <span className="timeline-loader">
                          ...
                        </span>
                      ) : (
                        <Icon size={14} />
                      )}

                    </div>

                    <div className="timeline-content">

                      <div className="timeline-title-row">

                        <strong>
                          {stage.title}
                        </strong>

                        <span className="timeline-status">
                          {status}
                        </span>

                      </div>

                      <p>
                        {stage.description}
                      </p>

                    </div>

                  </div>
                )
              })}

            </div>

          </section>

          <section className="investigation-panel evidence-panel">

            <div className="panel-header">

              <div>
                <p className="eyebrow">
                  EVIDENCE COLLECTED
                </p>

                <h3>
                  Case Evidence
                </h3>
              </div>

              <ShieldCheck size={20} />

            </div>

            <div className="evidence-list">

              <div className="evidence-item">
                <UserCheck size={18} />

                <div>
                  <strong>
                    Customer verified
                  </strong>

                  <span>
                    Identity confirmed
                  </span>
                </div>
              </div>

              <div className="evidence-item">
                <Package size={18} />

                <div>
                  <strong>
                    #78421 · ₹2,499
                  </strong>

                  <span>
                    Order located
                  </span>
                </div>
              </div>

              <div className="evidence-item">
                <Truck size={18} />

                <div>
                  <strong>
                    Express delivery
                  </strong>

                  <span>
                    Delivered 3 days late
                  </span>
                </div>
              </div>

              <div className="evidence-item">
                <History size={18} />

                <div>
                  <strong>
                    1 previous interaction
                  </strong>

                  <span>
                    Support history reviewed
                  </span>
                </div>
              </div>

              <div className="evidence-item">
                <FileCheck size={18} />

                <div>
                  <strong>
                    Shipping refund applicable
                  </strong>

                  <span>
                    Policy condition satisfied
                  </span>
                </div>
              </div>

            </div>

          </section>

        </div>

      </div>
    )
  }

  const renderAgentDashboard = () => (
    <div className="dashboard-page agent-dashboard-page">

      {/* PAGE HEADING */}
      <div className="page-heading">

        <div>
          <p className="eyebrow">
            HUMAN AGENT DASHBOARD
          </p>

          <h1>
            Human Review Queue
          </h1>

          <p>
            Review cases that require human attention after AI
            investigation.
          </p>
        </div>

        <div className="ai-status">
          <span></span>
          AI HANDOFF READY
        </div>

      </div>

      {/* STATS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">
            <AlertTriangle size={18} />
          </div>

          <div>
            <span>Escalated Cases</span>
            <strong>18</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock3 size={18} />
          </div>

          <div>
            <span>Pending Review</span>
            <strong>5</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Check size={18} />
          </div>

          <div>
            <span>Reviewed Today</span>
            <strong>24</strong>
          </div>
        </div>

      </div>

      {/* MAIN AGENT WORKSPACE */}
      <div className="agent-workspace">

        {/* CASE SUMMARY */}
        <section className="panel agent-case-panel">

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                ESCALATED CASE
              </p>

              <h3>
                Case #10480
              </h3>
            </div>

            <span className="case-status escalated">
              Escalated
            </span>

          </div>

          <div className="agent-case-grid">

            <div className="agent-info-card">
              <UserRound size={17} />

              <div>
                <span>Customer</span>
                <strong>Customer C</strong>
              </div>
            </div>

            <div className="agent-info-card">
              <Package size={17} />

              <div>
                <span>Order</span>
                <strong>#78419</strong>
              </div>
            </div>

            <div className="agent-info-card">
              <CreditCard size={17} />

              <div>
                <span>Issue</span>
                <strong>Duplicate payment</strong>
              </div>
            </div>

            <div className="agent-info-card">
              <Clock3 size={17} />

              <div>
                <span>Case Status</span>
                <strong>Awaiting Review</strong>
              </div>
            </div>

          </div>

          <div className="agent-section">

            <div className="agent-section-title">
              <MessageCircle size={16} />
              Complaint
            </div>

            <div className="agent-complaint">
              Customer reports being charged twice for the same order.
            </div>

          </div>

          <div className="agent-section">

            <div className="agent-section-title">
              <History size={16} />
              Support History
            </div>

            <div className="agent-history">

              <div>
                <strong>Previous contact</strong>
                <span>Customer contacted support once regarding payment.</span>
              </div>

              <div>
                <strong>Latest interaction</strong>
                <span>Duplicate charge reported after order completion.</span>
              </div>

            </div>

          </div>

        </section>

        {/* AI HANDOFF */}
        <section className="panel ai-handoff-panel">

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                AI HANDOFF
              </p>

              <h3>
                Investigation Summary
              </h3>
            </div>

            <div className="ai-handoff-icon">
              <Brain size={19} />
            </div>

          </div>

          <div className="ai-handoff-status">
            <Check size={15} />
            Investigation complete
          </div>

          <p className="ai-handoff-description">
            ResolveAI investigated the customer, order, payment
            evidence, and support history before escalating the case.
          </p>

          <div className="ai-findings">

            <div>
              <span>Customer verified</span>
              <strong>YES</strong>
            </div>

            <div>
              <span>Order located</span>
              <strong>YES</strong>
            </div>

            <div>
              <span>Payment evidence</span>
              <strong>CONFLICTING</strong>
            </div>

            <div>
              <span>Automatic action</span>
              <strong>BLOCKED</strong>
            </div>

          </div>

        </section>

      </div>

      {/* EVIDENCE + RECOMMENDATION */}
      <div className="agent-lower-grid">

        <section className="panel">

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                EVIDENCE CONSIDERED
              </p>

              <h3>
                Investigation Evidence
              </h3>
            </div>

            <ShieldCheck size={19} />

          </div>

          <div className="agent-evidence-list">

            <div className="agent-evidence-row">
              <Check size={15} />

              <div>
                <strong>Customer identity verified</strong>
                <span>Customer record matched successfully.</span>
              </div>
            </div>

            <div className="agent-evidence-row">
              <Check size={15} />

              <div>
                <strong>Order #78419 located</strong>
                <span>Order information retrieved successfully.</span>
              </div>
            </div>

            <div className="agent-evidence-row warning">
              <AlertTriangle size={15} />

              <div>
                <strong>Payment evidence conflicting</strong>
                <span>Two payment records require manual verification.</span>
              </div>
            </div>

            <div className="agent-evidence-row">
              <Check size={15} />

              <div>
                <strong>Support history reviewed</strong>
                <span>Previous payment-related interaction found.</span>
              </div>
            </div>

          </div>

        </section>

        <section className="panel recommendation-panel">

          <div className="panel-header">

            <div>
              <p className="eyebrow">
                AI RECOMMENDATION
              </p>

              <h3>
                Human Review Required
              </h3>
            </div>

            <AlertTriangle size={19} />

          </div>

          <div className="recommendation-box">

            <strong>
              Recommended Action
            </strong>

            <p>
              Verify the duplicate payment records before issuing
              any refund.
            </p>

          </div>

          <div className="escalation-reason">

            <span>
              ESCALATION REASON
            </span>

            <p>
              Conflicting payment evidence prevents ResolveAI from
              safely completing an automatic resolution.
            </p>

          </div>

          <div className="human-status">

            <div>
              <span>AI Decision</span>
              <strong>ESCALATE</strong>
            </div>

            <div>
              <span>Human Review</span>
              <strong>REQUIRED</strong>
            </div>

          </div>

        </section>

      </div>

    </div>
  )

  const renderPage = () => {
    switch (activePage) {
      case 'Customer Support':
        return renderCustomerSupport()

      case 'Investigations':
        return renderInvestigations()

      case 'Agent Dashboard':
        return renderAgentDashboard()

      case 'Dashboard':
      default:
        return renderDashboard()
    }
  }

  return (
    <div className="app-shell">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">
            <img
              src="/logo.jpeg"
              alt="ResolveAI logo"
            />
          </div>

          <div className="brand-text">
            <strong>RESOLVE AI</strong>
            <span>Autonomous Support</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <button
            className={`nav-item ${activePage === 'Dashboard'
              ? 'active'
              : ''
              }`}
            onClick={() => setActivePage('Dashboard')}
          >
            <LayoutDashboard size={18} />

            <span>
              Dashboard
            </span>
          </button>

          <button
            className={`nav-item ${activePage === 'Customer Support'
              ? 'active'
              : ''
              }`}
            onClick={() => setActivePage('Customer Support')}
          >
            <MessageCircle size={18} />

            <span>
              Customer Support
            </span>
          </button>

          <button
            className={`nav-item ${activePage === 'Investigations'
              ? 'active'
              : ''
              }`}
            onClick={() => setActivePage('Investigations')}
          >
            <SearchCheck size={18} />

            <span>
              Investigations
            </span>
          </button>

          <button
            className={`nav-item ${activePage === 'Agent Dashboard'
              ? 'active'
              : ''
              }`}
            onClick={() => setActivePage('Agent Dashboard')}
          >
            <UsersRound size={18} />

            <span>
              Agent Dashboard
            </span>
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="system-status">

            <span></span>

            <div>
              <strong>
                AI System Online
              </strong>

              <small>
                Qwen · Local Reasoning
              </small>
            </div>

          </div>

        </div>

      </aside>

      <main className="main-content">

        <header className="topbar">

          <div>

            <span className="topbar-label">
              RESOLVE AI
            </span>

            <span className="topbar-divider">
              /
            </span>

            <span>
              {activePage}
            </span>

          </div>

          <div className="topbar-status">

            <span></span>

            LOCAL AI ACTIVE

          </div>

        </header>

        {renderPage()}

      </main>

    </div>
  )
}

export default App