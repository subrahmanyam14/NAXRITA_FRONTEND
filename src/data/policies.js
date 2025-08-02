// Policy categories and sample data
export const policyCategories = [
  { id: 'key', name: 'Key Policies', description: 'Essential policies all employees must know' },
  { id: 'hr', name: 'HR Policies', description: 'Human resources related policies' },
  { id: 'code', name: 'Code of Conduct', description: 'Behavioral and ethical guidelines' },
  { id: 'global', name: 'Global Policies', description: 'Company-wide policies that apply to all locations' },
  { id: 'india', name: 'India Specific', description: 'Policies specific to our India operations' },
  { id: 'it', name: 'IT Policies', description: 'Technology and data security policies' },
  { id: 'finance', name: 'Finance', description: 'Financial policies and procedures' },
  { id: 'safety', name: 'Health & Safety', description: 'Workplace health and safety guidelines' },
  { id: 'operations', name: 'Operations', description: 'Operational policies and procedures' },
];

// Sample policies data
export const policies = [
  // Key Policies
  {
    id: 'key-1000',
    title: 'Naxrita_1000_Speaking_Up_and_Zero_Tolerance_for_Retaliation',
    category: 'key',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-08-01',
    version: '1.0',
    owner: 'Human Resources',
    appliesTo: 'All Employees and Third Parties',
    status: 'active',
    tags: ['speaking up', 'whistleblowing', 'retaliation', 'ethics', 'reporting'],
    content: `
      <h2 class="text-2xl font-bold mb-4">Naxrita's Policy on Speaking Up: Key Aspects</h2>
      <p class="mb-4">Naxrita strongly encourages and, in some cases, requires its employees to report concerns about violations of law, their Code of Business Ethics, or company policy. This includes, but is not limited to, issues related to harassment, discrimination, retaliation, and workplace violence.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">1. Types of Concerns to Report</h2>
      <p class="mb-4">Naxrita's policy covers a broad range of concerns, emphasizing a safe and respectful work environment. These include:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Any harassment (including sexual harassment and harassment based on personal characteristics such as race, color, ancestry, national/regional or ethnic origin, religion, sex, gender identity, sexual orientation, pregnancy, age or disability)</li>
        <li>Disrespectful behavior or insensitive treatment, even if that behavior may not rise to the level of harassment or discrimination</li>
        <li>Discrimination</li>
        <li>Retaliation</li>
        <li>Workplace violence or threats</li>
      </ul>
      <p class="mb-4">If you are unsure whether an issue should be reported, we encourage you to contact the Human Resources or Legal channels listed in Section 2.1. below for guidance. We want to hear from you. It does not matter whether you raise a concern verbally or in writing.</p>
      <p class="mb-4">We take all good faith concerns seriously and all steps necessary to ensure that you do not experience any form of retaliation for raising a concern. Employees who raise such concerns play a critical role in ensuring that Naxrita continues to operate with the highest standards of integrity, ethics and compliance.</p>
      <p class="mb-4">Nothing in this policy or in any agreement between you and Naxrita is intended to prohibit you (with or without notice to Naxrita) from reporting possible violations of laws or regulations to a governmental agency, regulatory body or a local authority, or from making disclosures that are protected under whistleblower laws and regulations.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. How to Raise Concerns</h2>
      <h3 class="text-xl font-semibold mt-6 mb-3">2.1 Channels for Raising Concerns</h3>
      <p class="mb-4">We understand that it is not always easy or comfortable to raise concerns. As a result, we provide multiple reporting channels in order to minimize potential unease in reporting an issue that may involve a colleague, a Naxrita Leader, a client, supplier or contractor, or anyone else. You may raise concerns through any of the following channels so we can take action on your behalf:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Your management, other trusted advisors or any Naxrita Leader</strong> – You can always raise any concern, or ask for advice or support, through your management (including, for example, your supervisor or their leadership), other trusted advisors (including, for example, leads outside of your management, Employee Resource Groups, etc.) or any Naxrita Leader. These individuals are expected to have the knowledge and experience on how to receive and escalate concerns.</li>
        <li><strong>Human Resources or Legal</strong> – You can also speak to members of Human Resources, (including your HR Representative or any member of the Employee Relations team) or anyone in Legal (including the Global Conduct Counts Matters team) in relation to any concern you have.</li>
        <li><strong>Naxrita Business Ethics Helpline</strong> – If you are not comfortable raising your concern through any of the options above (or you have done so, but did not receive a satisfactory response), you may visit the Naxrita Business Ethics Helpline (+91 40-49894368), where you may report your concern via the web or obtain a country-specific phone number to speak with an agent 24 hours a day, seven days a week. In most cases, you may remain anonymous when using the Naxrita Business Ethics Helpline; however, in certain countries this may not be the case due to local legal restrictions.</li>
      </ul>
      <p class="mb-4">Country-specific points of contact - In some countries there may be a designated individual appointed as a specific point of contact to receive concerns and discuss possible resolutions. You should check with your local Human Resources team or any member of Legal to determine if your country has this supplementary channel.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">2.2 How to Raise Concerns About Disrespectful Behavior, Harassment, Discrimination or Retaliation</h3>
      <p class="mb-4">If you believe you have experienced or witnessed disrespectful behavior, harassment (including sexual harassment or harassment based on personal characteristics such as race, color, ancestry, national/regional or ethnic origin, religion, sex, gender identity, sexual orientation, pregnancy, age or disability), discrimination or retaliation there are several ways to raise this.</p>
      <p class="mb-4">Reporting disrespectful behavior is not mandatory, but Naxrita strongly encourages you to do so and requires that you report disrespectful behavior based on personal characteristics that rises to the level of harassment (see below). If you have:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>experienced disrespectful behavior from a Naxrita employee, you could speak to the person involved and ask them to stop. In many cases, a discussion with individuals closest to the situation may be the best and fastest way to resolve an issue or concern. If they do not stop or if you prefer not to speak to the person, or it involves someone who is not a Naxrita employee (such as an employee of a Naxrita client or supplier), then we strongly encourage you to raise it to any of the channels listed in Section 2.1. above.</li>
        <li>witnessed disrespectful behavior, we strongly encourage you to report it to any of the channels listed in Section 2.1. above.</li>
      </ul>
      <p class="mb-4">You are required to report instances of harassment, discrimination or retaliation, including disrespectful behavior that rises to the level of harassment (e.g., a sustained pattern of conduct, a single incident of severe conduct or disrespectful behavior based on personal characteristics). If you have:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>experienced harassment, discrimination or retaliation by a Naxrita employee or from someone who is not a Naxrita employee (such as an employee of a Naxrita client or supplier), you must report it to any of the channels listed in Section 2.1 above.</li>
        <li>witnessed harassment, discrimination or retaliation you must report it to any of the channels listed in Section 2.1 above. We also encourage you to take any appropriate steps necessary to immediately intervene and stop any ongoing harassment, discrimination or retaliation from occurring.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">2.3 Specific Obligations of Naxrita Leaders</h3>
      <p class="mb-4">If you are a Naxrita Leader and you witness or become aware of:</p>
      <p class="mb-2"><strong>Disrespectful behavior:</strong></p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>You must make sure the person experiencing the disrespectful behavior is ok; and</li>
        <li>You should speak to the person involved and require them to stop; and</li>
        <li>If the person does not stop or you prefer not to speak to the person, you must escalate the matter promptly to the relevant Naxrita Leader, Human Resources, and/or Legal or via the Naxrita Business Ethics Helpline.</li>
      </ul>
      <p class="mb-2"><strong>Harassment or discrimination:</strong> you must take the same steps as above in the case of disrespectful behavior, but even if you step in and stop the harassment or discrimination from occurring, you must always report the matter immediately to Human Resources or Legal. The requirement to report harassment includes disrespectful behavior that rises to the level of harassment due to a sustained pattern of conduct, a single incident of severe conduct or if based on personal characteristics; if you are unsure consult with HR.</p>
      <p class="mb-4">See additional obligations of Naxrita Leaders in Section 5. below regarding retaliation.</p>
      <p class="mb-4">Leaders who fail to report violations of this policy may be subject to discipline, up to and including termination.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Responsibilities When Someone Raises a Concern to You</h2>
      <p class="mb-4">When someone raises a concern to you that relates to potential violations of the law, our Code or Naxrita policy, you must take the concern seriously and use good judgment to take appropriate action – with sensitivity, urgency and appropriate confidentiality. If someone is seeking your guidance, take the time to give them the information they need to make the right decision. If you are not sure what to say or do, reach out to a Naxrita Leader, Human Resources or Legal to get the guidance or input you need to determine the best way to address the concern.</p>
      <p class="mb-4">However, you must promptly report potential:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>violations involving harassment, discrimination or retaliation to the Human Resources or Legal channels listed in Section 2.1 above (including disrespectful behavior that rises to the level of harassment due to a sustained pattern of conduct, a single incident of severe conduct or if based on personal characteristics; if you are unsure consult with HR)</li>
        <li>workplace violence or threats as described in Section 6 below</li>
        <li>violations of law to Legal</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. What Happens After a Concern is Raised</h2>
      <p class="mb-4">We take seriously all concerns raised. The way we handle a concern will depend on its nature and severity. We may handle through discussions with relevant work colleagues, Naxrita Leaders or Human Resources, or we may handle by conducting fair and thorough investigations. But no matter how you raise your concern, we will always seek to ensure that it is handled promptly by the most appropriate global or local team or people within Naxrita.</p>
      <p class="mb-4">The purpose of investigations at Naxrita is to understand concerns that have been raised and to resolve misconduct. When you raise a concern, you are not expected to "make your case" or prove a "your story vs. their story" scenario. Instead, you will simply be asked in a private setting to explain what happened in more detail so that Naxrita can fully understand the issue. We will communicate with you so that you understand our investigation process in more detail. Among the ways we determine what happened is through additional interviews in private with you, with others who have information and with the person against whom the concern is raised, to give them an opportunity to respond. Investigations may also involve reviewing documents or communications. At the conclusion of an investigation, the investigating team, sometimes with input from others in Human Resources or Legal, will determine what outcomes are appropriate (for example, counseling or other discipline) and ensure that they are applied fairly and consistently on a global basis – regardless of seniority, position or contribution to Naxrita.</p>
      <p class="mb-4">Naxrita will handle all concerns raised with appropriate confidentiality and with a high degree of sensitivity. All those involved in investigating and/or addressing a concern will respect the need for confidentiality wherever reasonably possible. In some situations, privacy restrictions may also mean that we cannot disclose the actions that are taken to resolve a particular concern.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. No Retaliation</h2>
      <p class="mb-4">Naxrita prohibits retaliation in any form. Naxrita will not tolerate retaliation against any employee who:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>comes forward to raise, in good faith, a concern about a violation of any law, our Code or any Naxrita policy (including concerns about disrespectful behavior, harassment, discrimination or retaliation) or</li>
        <li>assists us, or a law enforcement authority, by providing information to address a concern.</li>
      </ul>
      <p class="mb-4">Naxrita Leaders have a specific obligation to ensure that there is no retaliation against such employees, either during a matter or after it is closed, and to report retaliation immediately to Human Resources or Legal. Naxrita takes seriously all reports of retaliation. If you believe you have been subjected to retaliation, you must raise your concern.</p>
      <p class="mb-4">"Retaliation" is actual or threatened unfair or negative treatment of any kind against an individual because that person has raised a good faith concern or participated in a report or investigation. Retaliation can take many forms; examples include dismissing or suspending an employee, denying an employee a promotion or a raise, declining to staff an employee on a particular project, treating an employee with harassing or insensitive conduct, spreading rumors intended to cause harm to an employee, unjustified negative attacks on an employee's personal or professional life (including through any performance assessment), shunning, excluding or any other negative treatment that adversely affects the employee's workplace experience. Furthermore, retaliation can be overt or subtle. It can occur while an investigation is ongoing or after a matter is closed. Overt retaliation occurs when someone specifically treats an employee differently due to their involvement in a report or investigation, such as refusing to staff the employee on a project because he or she is "not seen as a team player." Retaliation can also be subtle, where the negative treatment is not explicitly tied to an employee's prior involvement in a report or investigation, but where the person involved nonetheless treats the employee differently.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">6. Reporting Workplace Violence and Threats</h2>
      <h3 class="text-xl font-semibold mt-6 mb-3">6.1 Emergency Situations</h3>
      <p class="mb-4">If you are at immediate risk of physical harm or have suffered physical harm, or you believe that any other individual is at immediate risk of physical harm or has suffered physical harm:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Follow all safety and emergency procedures at our facilities and at client or other work sites.</li>
        <li>Contact local emergency services or appropriate law enforcement immediately when it is safe to do so and follow directions provided.</li>
        <li>After which, contact any site security available and the Naxrita Workplace team; if there is no site security or local Naxrita Workplace Team immediately available, contact the Naxrita Security Operations Center (ASOC) (+91 40-49894368).</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">6.2 Potentially Dangerous Situations</h3>
      <p class="mb-4">If the potential for workplace violence exists, you must:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Contact the Naxrita Security Operations Center (ASOC) (+91 40-49894368), who will contact the Global Assistance and Protection (GAP) team immediately. Follow any recommended actions.</li>
        <li>Advise a member of Human Resources and site security or the Naxrita Workplace team (Human Resources should engage the local Employee Relations/Labor Relations team).</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">7. Violations of This Policy</h2>
      <p class="mb-4">Violations of this policy may lead to disciplinary action (up to, and including, termination of employment). While Naxrita retains discretion as to how to respond to any violation of this policy, any disciplinary process will be undertaken in accordance with all applicable local laws and other legal requirements.</p>
      <p class="mb-4">Please note that compliance with this policy is a baseline requirement to be fully eligible for promotion and rewards. In all cases where disciplinary action following an investigation into misconduct results in a final written warning, you will be ineligible for promotion in the next applicable cycle. In addition, there will be a 10% decrease applied to any base pay increase and to any applicable bonus submitted as part of your reward decisions in the next applicable cycle, subject to local law.</p>
    `,
    relatedPolicies: ['key-1001', 'key-1002', 'key-1003', 'key-1004'],
    attachments: [
      { name: 'Naxrita_1000_Speaking_Up_Policy.pdf', url: '#', type: 'pdf', size: '380 KB' },
      { name: 'Ethics_Helpline_Guide.pdf', url: '#', type: 'pdf', size: '250 KB' },
      { name: 'Anti_Retaliation_FAQ.pdf', url: '#', type: 'pdf', size: '195 KB' }
    ]
  },

  // Key Policies
  {
    id: 'key-1001',
    title: 'Naxrita_1001_Respecting_the_Individual',
    category: 'key',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-06-15',
    version: '2.0',
    owner: 'Human Resources',
    appliesTo: 'All Employees and Third Parties',
    status: 'active',
    tags: ['respect', 'conduct', 'workplace', 'harassment'],
    content: `
      <h2 class="text-2xl font-bold mb-4">1. We Treat Each Other with Respect</h2>
      <p class="mb-4">Consistent with Naxrita's core value of Respect for the Individual, all employees and those they interact with are expected to be treated respectfully. This policy aims to maintain a safe and non-threatening workplace and prohibits disrespectful behavior, harassment, discrimination, or workplace violence or threats of any kind. The "workplace" extends to all work-related situations, including interactions with clients, suppliers, and even hotel, restaurant, and airline staff.</p>
      
      <p class="mb-4">While this policy incorporates important legal principles related to disrespectful treatment and harassment (including sexual harassment and harassment based on personal characteristics like race, color, ancestry, national/regional or ethnic origin, religion, sex, gender identity or expression, sexual orientation, pregnancy, age, or disability), Naxrita's values and policy go beyond legal requirements. The goal is a workplace free from any form of disrespectful behavior and harassment, regardless of whether it's addressed by law.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. What We Mean by Disrespectful Behavior, Harassment, and Workplace Violence or Threats</h2>
      <p class="mb-4">Disrespectful behavior and harassment are defined as any treatment of a person that creates an intimidating, hostile, or offensive working environment, or any inappropriate behaviors that interfere with work performance. These actions are contrary to Naxrita's values and are prohibited by this policy, even if not explicitly illegal in a given jurisdiction.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">2.1 Examples of What May Amount to Disrespectful Behavior and/or Harassment</h3>
      <p class="mb-4">While distinct, disrespectful behavior and harassment are similar concepts. Harassment generally involves a sustained pattern of conduct or sometimes a single incident of severe conduct that negatively affects an employee's workplace experience. Disrespectful behavior may be more subtle actions or comments that do not reach the level of harassment on their own but still negatively affect others.</p>
      
      <div class="bg-gray-50 p-4 rounded-lg my-4">
        <h4 class="font-semibold mb-2">Examples include:</h4>
        <ul class="list-disc pl-6 space-y-2">
          <li>Something someone says or does (or does not say or do), in person or remotely</li>
          <li>Emails, letters, or documents</li>
          <li>Posts or replies on intranets or the internet (social media platforms)</li>
          <li>Messages sent via instant messenger, Microsoft Teams, or other applications</li>
          <li>Interactions in virtual environments</li>
          <li>Physical gestures</li>
          <li>AI-generated, digitally altered, or otherwise faked images, voices, audio, video, or other material or media</li>
        </ul>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3">2.2 Where Disrespectful Behavior or Harassment Can Occur</h3>
      <p class="mb-4">Prohibited behavior can occur in any work-related situation, including:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>At work (Naxrita premises, client premises, ecosystem partner premises, home office, or telecommuting locations)</li>
        <li>During business travel (hotel, restaurant, conference center, airplane)</li>
        <li>In virtual environments (metaverse, online settings like email, messaging platforms, social media, conference calls)</li>
        <li>At work events or meetings (including client-sponsored events)</li>
        <li>At social events with fellow employees and work-related contacts</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">2.3 What Disrespectful Behavior and Harassment Does Not Include</h3>
      <p class="mb-4">Minor, one-off instances of disrespectful behavior may not violate this policy. It's important to distinguish inappropriate behavior from normal day-to-day conversations and interactions. Transparent and fair discussions about workplace matters are appropriate. For example:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Candid, factual, and constructive feedback</li>
        <li>Respectful collaboration and sharing ideas where people may not always agree</li>
        <li>Putting an employee through a disciplinary process or taking measures to address performance improvement</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Your Responsibilities</h2>
      <p class="mb-4">All Naxrita employees, at all management levels, are expected to embody Naxrita's core values in all work-related situations and everything connected with Naxrita's activities and/or reputation. Every employee (and others interacted with in work-related situations) is entitled to be treated with dignity, respect, and professional courtesy, regardless of seniority, role, or other personal/professional characteristics.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">3.1 Specific Obligations of Naxrita Leaders</h3>
      <p class="mb-4">Naxrita Leaders are role models with a specific obligation to visibly demonstrate core values and professional behaviors. They must actively promote respect in the workplace and foster a positive working environment where people treat each other with dignity and respect, even under pressure to drive and deliver results.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. How to Raise Concerns</h2>
      <p class="mb-4">Naxrita values the personal dignity of all its employees and third parties. It is vitally important for Naxrita to know if disrespectful treatment or harassment is occurring. Employees have a right to speak up, and Naxrita encourages them to do so.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">5. Violations of This Policy</h2>
      <p class="mb-4">Violations of this policy may lead to disciplinary action, up to and including termination of employment. In other cases, coaching or counseling may be the most effective approach. While Naxrita retains discretion on how to respond to any violation, any disciplinary process will be undertaken in accordance with all applicable local laws and other legal requirements.</p>
      
      <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-yellow-700">
              Compliance with this policy is a baseline requirement for full eligibility for promotion and rewards. If disciplinary action following a misconduct investigation results in a final written warning, you will be ineligible for promotion in the next applicable cycle.
            </p>
          </div>
        </div>
      </div>
    `,
    relatedPolicies: ['key-1002'],
    attachments: [
      { name: 'Respect in the Workplace - PDF', url: '#', type: 'pdf', size: '245 KB' },
      { name: 'Respect in the Workplace - DOCX', url: '#', type: 'docx', size: '180 KB' }
    ]
  },

  // Global Policies
  {
    id: 'global-1',
    title: 'Global Code of Conduct',
    category: 'global',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-06-15',
    version: '3.2',
    owner: 'Global Compliance Team',
    appliesTo: 'All Employees Worldwide',
    status: 'active',
    tags: ['compliance', 'ethics', 'global'],
    content: `
      <h2>1. Introduction</h2>
      <p>Our Global Code of Conduct sets the standard for how we conduct business and make decisions. It applies to all employees, officers, and directors across all locations.</p>
      
      <h2>2. Our Values</h2>
      <p>We are committed to:</p>
      <ul>
        <li>Integrity in all our actions</li>
        <li>Respect for all individuals</li>
        <li>Compliance with laws and regulations</li>
        <li>Ethical business practices</li>
      </ul>

      <h2>3. Workplace Behavior</h2>
      <p>We maintain a work environment free from discrimination, harassment, and retaliation. All employees are expected to treat each other with dignity and respect.</p>

      <h2>4. Conflicts of Interest</h2>
      <p>Employees must avoid situations where their personal interests conflict, or appear to conflict, with the interests of the company.</p>

      <h2>5. Reporting Violations</h2>
      <p>Any violations of this code should be reported to your manager, HR, or through our confidential reporting hotline.</p>
    `,
    relatedPolicies: ['global-2', 'hr-1', 'hr-2'],
    attachments: [
      { name: 'Code_of_Conduct.pdf', size: '1.2 MB' },
      { name: 'Acknowledgment_Form.docx', size: '45 KB' }
    ]
  },
  
  // Add 9 more global policies...
  {
    id: 'global-2',
    title: 'Global Anti-Bribery and Anti-Corruption Policy',
    category: 'global',
    effectiveDate: '2023-03-01',
    lastUpdated: '2023-05-10',
    version: '2.1',
    owner: 'Legal Department',
    appliesTo: 'All Employees Worldwide',
    status: 'active',
    tags: ['compliance', 'legal', 'global'],
    content: `
      <h2>1. Policy Statement</h2>
      <p>Our company has a zero-tolerance policy towards bribery and corruption. This policy applies to all business dealings and transactions in all countries where we operate.</p>
      
      <h2>2. Prohibited Conduct</h2>
      <p>Employees must never:</p>
      <ul>
        <li>Offer, promise, give, request, agree to receive or accept any bribe</li>
        <li>Make facilitation payments</li>
        <li>Engage in any form of corruption</li>
      </ul>

      <h2>3. Gifts and Hospitality</h2>
      <p>All gifts and hospitality must be properly recorded and comply with our Gifts and Hospitality Policy.</p>

      <h2>4. Third Parties</h2>
      <p>We are responsible for the actions of our business partners, agents, and representatives. Proper due diligence must be conducted before engaging third parties.</p>
    `,
    relatedPolicies: ['global-1', 'hr-3'],
    attachments: [
      { name: 'Anti-Bribery_Policy.pdf', size: '980 KB' },
      { name: 'Third_Party_Due_Diligence_Checklist.xlsx', size: '320 KB' }
    ]
  },

  // India Specific Policies
  {
    id: 'india-1',
    title: 'India Leave Policy',
    category: 'india',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-06-20',
    version: '4.0',
    owner: 'India HR Team',
    appliesTo: 'India Employees',
    status: 'active',
    tags: ['leave', 'hr', 'india'],
    content: `
      <h2>1. Leave Entitlements</h2>
      <p>All permanent employees in India are entitled to the following leaves:</p>
      <ul>
        <li>Privilege Leave: 15 days per year</li>
        <li>Sick Leave: 12 days per year</li>
        <li>Casual Leave: 7 days per year</li>
        <li>Maternity Leave: 26 weeks</li>
        <li>Paternity Leave: 15 days</li>
      </ul>

      <h2>2. Leave Application Process</h2>
      <p>All leaves must be applied through the HRMS portal at least 7 days in advance, except for sick leave and emergencies.</p>

      <h2>3. Public Holidays</h2>
      <p>In addition to national holidays, employees are entitled to 3 optional holidays per calendar year.</p>
    `,
    relatedPolicies: ['hr-4', 'hr-5'],
    attachments: [
      { name: 'India_Leave_Policy.pdf', size: '850 KB' },
      { name: 'Holiday_Calendar_2023.pdf', size: '210 KB' }
    ]
  },

  // Key Policies
  {
    id: 'key-1',
    title: 'Information Security Policy',
    category: 'key',
    effectiveDate: '2023-02-15',
    lastUpdated: '2023-07-01',
    version: '5.1',
    owner: 'IT Security Team',
    appliesTo: 'All Employees',
    status: 'active',
    tags: ['security', 'it', 'compliance'],
    content: `
      <h2>1. Purpose</h2>
      <p>This policy establishes the rules for protecting company information assets from all threats, whether internal or external, deliberate or accidental.</p>
      
      <h2>2. Password Requirements</h2>
      <ul>
        <li>Minimum 12 characters</li>
        <li>Must include uppercase, lowercase, numbers, and special characters</li>
        <li>Must be changed every 90 days</li>
        <li>No reuse of last 5 passwords</li>
      </ul>

      <h2>3. Data Classification</h2>
      <p>All company data must be classified as Public, Internal, Confidential, or Restricted.</p>

      <h2>4. Remote Access</h2>
      <p>Remote access to company systems requires VPN and multi-factor authentication.</p>
    `,
    relatedPolicies: ['it-1', 'it-2'],
    attachments: [
      { name: 'Info_Security_Policy.pdf', size: '1.5 MB' },
      { name: 'Data_Classification_Guide.pdf', size: '780 KB' }
    ]
  },

  // HR Policies
  {
    id: 'hr-1',
    title: 'Remote Work Policy',
    category: 'hr',
    effectiveDate: '2023-03-01',
    lastUpdated: '2023-06-15',
    version: '2.3',
    owner: 'HR Department',
    appliesTo: 'All Eligible Employees',
    status: 'active',
    tags: ['remote', 'workplace', 'hr'],
    content: `
      <h2>1. Eligibility</h2>
      <p>Remote work arrangements are available to employees whose job responsibilities can be effectively performed outside the office.</p>
      
      <h2>2. Work Hours</h2>
      <p>Employees are expected to be available during core business hours (10 AM - 3 PM local time).</p>

      <h2>3. Home Office Requirements</h2>
      <p>Employees must maintain a dedicated, distraction-free workspace and have reliable internet connectivity.</p>

      <h2>4. Equipment</h2>
      <p>The company will provide necessary equipment. All equipment must be used in accordance with IT policies.</p>
    `,
    relatedPolicies: ['hr-2', 'it-1'],
    attachments: [
      { name: 'Remote_Work_Policy.pdf', size: '920 KB' },
      { name: 'Remote_Work_Agreement.docx', size: '65 KB' }
    ]
  },
  // Add more policies as needed...
  
  // Key Policies
  {
    id: 'key-1002',
    title: 'Naxrita_1002 Behaving Professionally',
    category: 'key',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-08-01',
    version: '1.0',
    owner: 'Human Resources',
    appliesTo: 'All Employees',
    status: 'active',
    tags: ['professionalism', 'conduct', 'workplace', 'ethics', 'alcohol', 'appearance'],
    content: `
      <h2 class="text-2xl font-bold mb-4">1. Introduction</h2>
      <p class="mb-4">Our Code of Business Ethics tells us that as ambassadors of Naxrita, we conduct ourselves in accordance with the highest standards of professional behaviour. Whether at work, travelling on business, attending training, participating in social events, or interacting in virtual environments (including a metaverse or a similar virtual world) with colleagues or clients, we are always "ambassadors of Naxrita" and our behaviour reflects both on ourselves and on Naxrita. Each of us therefore has a personal responsibility to act professionally.</p>
      <p class="mb-4">This Policy 1002 describes how Naxrita requires its employees, at every management level, to behave while working and in work-related situations. This Policy addresses generally the expectations for professional conduct and also covers prohibitions related to the use of alcohol or drugs. You are also required to comply with our Policy 1001 – Respecting the Individual in all personal interactions with others, as set out in that Policy.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">2. Scope of this Policy</h2>
      <p class="mb-4">This policy applies to your behaviour in all work-related situations and applies to your behaviour involving anyone at Naxrita, and any other people you interact with in a work-related situation, including client personnel, personnel of our suppliers, advisors to our clients, and hotel, restaurant and airline staff.</p>
      <p class="mb-4">A "work-related situation" means any situation when you are engaged in any activity connected with Naxrita. This includes:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>At work (including Naxrita premises, client premises, ecosystem partner premises, your home office or some other location as part of a telecommuting work arrangement)</li>
        <li>During business travel for Naxrita (including at a hotel, restaurant, conference center or in an airplane)</li>
        <li>When in a virtual environment (including a metaverse or a similar virtual world), an online setting (including email, messaging platforms or social media) or conference call, whether using a computer, laptop, tablet, phone, smartphone, headset or any other device</li>
        <li>At a work event or meeting (including client-sponsored events)</li>
        <li>At a social event with fellow employees and other work-related contacts (including client-related hospitality)</li>
        <li>At a training event (including training at an external training facility)</li>
        <li>At a corporate event (whether or not organized by Naxrita), such as an industry conference, where you are attending as a representative of Naxrita</li>
        <li>Personally organized events with Naxrita employees, clients, ecosystem partners or suppliers</li>
        <li>In a public situation where you are identifiable as, or known to be, an employee of Naxrita</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Your Professional Behavior</h2>
      <p class="mb-4">Professional behavior is grounded in integrity and is the foundation for earning and maintaining the trust and confidence of our colleagues, our clients and all others with whom we do business. Therefore, whenever you are in a work-related situation Naxrita expects you to exercise good judgment to behave in accordance with the highest standards of professional behavior.</p>
      <p class="mb-4">In particular, in all work-related situations Naxrita requires that you:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Comply with our Policy 1001 – Respecting the Individual in all your personal interactions with others, as set out in that policy;</li>
        <li>Act responsibly and respectfully when consuming alcohol in work-related situations. Section 4 Use of Alcohol describes guidelines when alcohol is served at Naxrita-hosted events and other work-related situations;</li>
        <li>Make every effort to be punctual for meetings and training sessions;</li>
        <li>Comply with all relevant local office policies and practices including those prohibiting: (1) smoking in the workplace; and/or (2) weapons in the workplace;</li>
        <li>Be sensitive to cultural differences, remembering that Naxrita is a global organization. Be careful to communicate in a way that is not likely to be misinterpreted, and avoid making jokes that could be found offensive;</li>
        <li>Communicate thoughtfully: while we are all entitled to our own opinions, avoid making derogatory statements that could negatively reflect on Naxrita's clients and business partners and on your own professional image;</li>
        <li>Take reasonable care to avoid damage to or misuse of property (including that of third parties including, for example, clients, airlines and hotels);</li>
        <li>Must ensure that any venue you choose for a work social event or client related hospitality properly reflects Naxrita's policies and core values. Such venues should never create an offensive, exclusive or demeaning atmosphere for employees or clients;</li>
        <li>Do not engage in any other inappropriate behaviour that may adversely affect the reputation of Naxrita, client personnel or others.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Use of Alcohol</h2>
      <h3 class="text-xl font-semibold mt-6 mb-3">4.1 General</h3>
      <p class="mb-4">You must not consume alcohol while you are working in any Naxrita location, client location, your home office, or any other work location. If you drink alcohol outside of working hours, this must not disrupt your ability to properly perform your work responsibilities and exercise good judgment while working. In addition, the requirements below must be followed in connection with work-related situations, Naxrita locations and Naxrita-hosted events.</p>
      <p class="mb-4">If you are concerned about your drinking, please contact the confidential counselling support available through our Employee Assistance Program (EAP).</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4.2 Work-related situations</h3>
      <p class="mb-4">If you drink alcohol in any work-related situation (including those listed in Section 2 above), you must consume responsibly and in moderation. We expect you to behave professionally and maintain a respectful environment at all times, as described in Policy 1001 – Respecting the Individual. Please remember that alcohol can affect judgment and reduce inhibitions. At Naxrita, alcohol consumption is never considered an excuse for disrespectful behaviour or harassment. You must not put pressure on others to drink alcohol.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4.3 Naxrita-hosted events</h3>
      <p class="mb-4">All Naxrita Leaders or their delegates who are present at any Naxrita-hosted event (regardless of size, purpose, location or attendees, including colleagues, clients, ecosystem partners, or vendors) must be responsible stewards and are accountable for taking reasonable steps to ensure standards of professional behaviour and a respectful environment are maintained, including any necessary reminders to those attending the event to consume alcohol responsibly.</p>
      <p class="mb-4">If you are planning a Naxrita-hosted event you must ensure that, either an accountable Naxrita Leader will be present at the event or, if no Naxrita Leader is going to be present, delegate accountability and responsibility to the most senior person present. If the accountable person leaves before the event is over, that responsibility must be delegated to the most senior person remaining, who understands, accepts and is able to assume that accountability. For gatherings such as team dinners or drinks that do not have a specific planner or planning process, the most senior person present is responsible and accountable for taking reasonable steps to ensure standards of professional behaviour and a respectful environment are maintained.</p>
      <p class="mb-4">In addition to the above, Naxrita-hosted events held at Naxrita locations must meet Naxrita Workplace requirements, which can be found via internal resources.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4.4 Personally organized events with Naxrita employees, clients, ecosystem partners or suppliers</h3>
      <p class="mb-4">If you drink alcohol while attending personally organized events with Naxrita employees, clients, ecosystem partners or suppliers, you must consume responsibly and in moderation, as well as behave professionally and maintain a respectful environment at all times, as described in Policy 1001 – Respecting the Individual. These requirements apply regardless of whether the event comes before or after, or is independent of, a Naxrita-hosted event or other work-related situation or you seek or are entitled to reimbursement of expenses related to purchase of alcoholic beverages.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4.5 Naxrita locations</h3>
      <p class="mb-4">There must be no permanent designated areas that serve alcohol in any Naxrita location, for example, self-serve coolers, taps or bars. Alcohol may still be provided in the location at a Naxrita-hosted event.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">4.6 Local country requirements</h3>
      <p class="mb-4">It is important to remember Naxrita is a global organization, and that in some locations drinking alcohol may be culturally unusual or unacceptable. Certain countries may describe when alcohol is, or is not, permitted in work-related situations, and you must fully comply with the requirements of the country in which you are working. In addition, you must fully comply with any and all local laws governing or relating to the consumption of alcohol.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Clothing and Appearance</h2>
      <p class="mb-4">Naxrita supports your decision on clothing and appearance that reflects your identity and personal characteristics such as your race, color, ancestry, national/regional or ethnic origin, religion, sex (including intersex status), gender identity or expression (including all identities under the terms cisgender, transgender, gender diverse, gender non-conforming or non-binary), sexual orientation (including all orientations under the terms lesbian, gay, bisexual or queer), pregnancy, age, disability or any other status protected by applicable local law (consistent with Policy 1003 – Ensuring Meritocracy and Non-Discrimination). We also expect you to be inclusive regarding others' decisions on what to wear at work and their appearance.</p>
      <p class="mb-4">Your clothing and appearance must be professional, respectful of others, and appropriate for the business situation, consistent with the following:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>The business environment of the client always takes priority and therefore while working at or visiting a client site where professional business attire is required, you must dress accordingly.</li>
        <li>While visiting another Naxrita location, you must dress in accordance with the practices of the office visited.</li>
        <li>If you are in a role that requires you to meet with clients, or attend special events as a representative of Naxrita, be prepared for unexpected meetings with clients or events, ensuring you have easy access to the appropriate attire.</li>
      </ul>
      <p class="mb-4">If you are a Supervisor or People Lead and what someone is wearing or how they appear is not professional, respectful of others, or appropriate for the business situation, it is your responsibility to respectfully bring this to their attention and to address it in an appropriate and proportionate way. If you need support with how to have such a conversation, please contact your HR Advisor.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">6. Illegal Activities</h2>
      <h3 class="text-xl font-semibold mt-6 mb-3">6.1 General</h3>
      <p class="mb-4">Naxrita is committed to the highest level of ethical and legal conduct and expects the same from all its employees. If you engage in illegal activities of any sort in the state, country or locality in which you are working or travelling, your conduct may constitute a serious violation of this policy that could (subject to applicable laws) lead to disciplinary action against you (up to, and including, termination of your employment). Subject to applicable laws, Naxrita also reserves the right to inform appropriate law enforcement agencies of your engagement in such illegal activities.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">6.2 Drugs (Prohibited or legal)</h3>
      <p class="mb-4">Naxrita is committed to a workplace free of prohibited drugs. Employees who use prohibited drugs may experience or cause a number of work-related problems such as accidents or injuries, excessive absenteeism and tardiness, lower productivity, missed deadlines and poor quality of work. Equally important, the use of prohibited drugs can cause a number of personal health and behavioural problems. Naxrita emphasizes that drug abuse is dangerous in the workplace and will not be condoned.</p>
      <p class="mb-4">You must not possess, use, sell or otherwise deal with a prohibited drug in any work-related situation. You also must not be under the influence of a drug (legal or prohibited) or any other intoxicating substance when performing your work responsibilities, whether you are at the office, a client site, or working elsewhere.</p>
      <p class="mb-4">When we refer to a "prohibited drug" we mean any substance that is illegal, prohibited or banned (including legal substances such as solvents which can be misused, and also prescription drugs which are used in a manner other than as prescribed).</p>
      <p class="mb-4">If you have a concern about alcohol or drug dependency, and would like counselling and support, you may be able to use Naxrita's Employee Assistance Program (where available – please contact your People Advisor, PeopleLine or Human Resources as appropriate for your location for more information if the EAP is available in your geography or check for any additional information for your country). The EAP offers confidential short-term counselling for employees and family members for personal or work-related issues such as alcohol or drug dependency.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">7. Violation of this Policy</h2>
      <p class="mb-4">Naxrita takes violations of this policy very seriously. Depending on the facts and wider circumstances involved, issues may require escalation and/or be dealt with as a disciplinary matter and may lead to disciplinary action being taken (up to, and including, termination of employment). In other cases, coaching or counselling may be the most effective approach to addressing the unprofessional behaviour. Subject to any applicable legal requirements, it is in Naxrita's discretion as to how to respond to any violation of this policy. Any disciplinary matter will be dealt with in accordance with any local country laws that set out the scope and procedure for investigating, and dealing with, these issues.</p>
      <p class="mb-4">Please note that compliance with this policy is a baseline requirement to be fully eligible for promotion and rewards. In all cases where disciplinary action following an investigation into misconduct results in a final written warning, you will be ineligible for promotion in the next applicable cycle. In addition, there will be a 10% decrease applied to any base pay increase and to any applicable bonus submitted as part of your reward decisions in the next applicable cycle, subject to local law.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">8. How to Raise Concerns</h2>
      <p class="mb-4">We are all responsible for our own behaviour and for adhering to the requirements of this Policy 1002. However, if you know or reasonably suspect that another employee is in violation of this Policy, then we strongly encourage you to raise the issue. You can raise this with your People Lead, your supervisor, any Naxrita Leader, your People Advisor or any member of Human Resources, or any member of the Legal group.</p>
      <p class="mb-4">In addition, Policy 1000 – Speaking Up and Zero Tolerance for Retaliation gives you further information on how you can also raise good faith concerns (including through the Naxrita Business Ethics Helpline). Certain countries have restrictions on the use of the Naxrita Business Ethics Helpline, which are further described in Policy 1000 – Speaking Up and Zero Tolerance for Retaliation, its local country supplements and/or via the Naxrita Business Ethics Helpline internal resources.</p>
      <p class="mb-4">Naxrita will not tolerate retaliation against any employee who raises a good faith belief that a violation of this policy has occurred, or who is involved in any investigation into an alleged violation.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">9. Specific Obligations on Naxrita Leaders</h2>
      <p class="mb-4">All Naxrita Leaders are role models who must actively demonstrate and encourage professional behaviour in work-related situations.</p>
      <p class="mb-4">If you are a Naxrita Leader and you know or reasonably suspect that another employee's behaviour is in violation of this policy:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>You should speak to the person involved and (depending on the type of behaviour) require them to stop the relevant behaviour and/or to comply with this policy;</li>
        <li>If the person does not stop (or you prefer not to speak to the person or decide that the matter must be escalated for any reason), you must escalate the matter promptly to the relevant Naxrita Leadership, any member of the Human Resources Group, and/or the Legal Group, or via the Naxrita Business Ethics Line (see Policy 1000 – Speaking Up and Zero Tolerance for Retaliation for details on how to access the Naxrita Business Ethics Line).</li>
      </ul>
    `,
    relatedPolicies: ['key-1001', 'key-1003', 'key-1004'],
    attachments: [
      { name: 'Naxrita_1002_Behaving_Professionally.pdf', url: '#', type: 'pdf', size: '450 KB' },
      { name: 'EAP_Information_Sheet.pdf', url: '#', type: 'pdf', size: '120 KB' }
    ]
  },

  // Key Policies
  {
    id: 'key-1003',
    title: 'Naxrita_1003 Ensuring Meritocracy and Non-Discrimination',
    category: 'key',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-08-01',
    version: '1.0',
    owner: 'Human Resources',
    appliesTo: 'All Employees',
    status: 'active',
    tags: ['meritocracy', 'non-discrimination', 'diversity', 'inclusion', 'hr'],
    content: `
      <h2 class="text-2xl font-bold mb-4">1. We Ensure Meritocracy</h2>
      <p class="mb-4">Consistent with our core value of Best People and commitment to provide equal employment opportunities to all applicants and employees, Naxrita seeks to attract, develop, and retain the best talent for our business regardless of personal characteristics or background, and to foster a fair, equitable, and inclusive environment.</p>
      <p class="mb-4">Our principle of meritocracy means that all employment decisions must be based only on merit, which includes an individual's job qualifications, demonstrated contributions to Naxrita's work and its workplace, capabilities (that is skills and abilities), and potential to grow, develop, and contribute to the business in the future, within the context of meeting Naxrita's business needs. "Employment decision" means any decision about a person's recruitment with Naxrita and/or any employee's selection, hiring, career advancement, promotion, performance evaluation, work assignments (including selection for certain client projects), compensation and benefits, ending employment, or any other aspect of Naxrita's employment policies and practices.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4">2. We Do Not Discriminate</h2>
      <p class="mb-4">Naxrita prohibits discrimination in any form and is committed to fostering a fair, equitable, and inclusive workplace for all employees.</p>
      <p class="mb-4">Naxrita is a global company. Many local laws around the world prohibit discrimination against people on the basis of personal characteristics, including race, color, ancestry, genetic information, national/regional or ethnic origin, citizenship status, religion, creed, sex (including intersex status), gender identity or expression (including all identities under the terms cisgender, transgender, gender diverse, gender non-conforming or non-binary), sexual orientation (including all orientations under the terms lesbian, gay, bisexual or queer), pregnancy, maternity, marital or family status, age, physical or mental disability, veteran status or any other status protected by applicable local law.</p>
      <p class="mb-4">We require our people to comply with such laws against discrimination. But Naxrita's ethical values go beyond legal requirements: all employees have a responsibility to ensure meritocracy and non-discrimination.</p>
      <p class="mb-4">Discrimination occurs when an applicant or employee is treated less favorably in the workplace based on personal characteristics—such as race, color, ancestry, national/regional or ethnic origin, religion, sex, gender identity or expression, sexual orientation, pregnancy, age or disability—including as it relates to recruiting, hiring, compensation, assignment, promotion, discipline, termination or terms and conditions of employment. Examples of discrimination include any of the following when based on personal characteristics:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Excluding certain applicants during the recruitment process</li>
        <li>Denying certain employees compensation or benefits</li>
        <li>Paying equally qualified employees in the same position different salaries</li>
        <li>Preferring one candidate over another in a promotion decision</li>
        <li>Terminating an employee</li>
        <li>Undertaking a seemingly neutral policy that instead has the effect of discriminating against a certain group of people</li>
      </ul>
      <p class="mb-4">Discrimination can be intentional or unintentional. Even neutral practices that have the effect of excluding individuals from certain groups can violate this policy.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. "Positive Action" and "Affirmative Action" Laws</h2>
      <p class="mb-4">In certain countries, local laws may require Naxrita to (or may give Naxrita the right to) protect or give priority to a particular category of people when taking certain employment decisions. Naxrita complies with all such laws, which prevail over this policy. Please refer to relevant internal guidelines or your HR representative for Naxrita's position on Positive Action in specific regions.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Specific Obligations of Naxrita Leaders</h2>
      <p class="mb-4">All Naxrita Leaders are role models who have a specific obligation to visibly demonstrate Naxrita's commitment to ensure meritocracy and non-discrimination. Naxrita Leaders must actively promote a diverse, fair, equitable, and inclusive working environment. They must also take appropriate action if they witness or become aware of behaviour that violates this policy and must encourage their teams to do the same as described in Naxrita's Speaking Up and Zero Tolerance for Retaliation Policy.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. How to Raise Concerns</h2>
      <p class="mb-4">If you believe that this policy has been violated, either as applied to you or one of your colleagues, you must report the issue to Naxrita per Naxrita's Speaking Up and Zero Tolerance for Retaliation Policy, which also describes what happens when a concern is raised (including the investigation process and confidentiality) and Naxrita's zero tolerance for retaliation.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">6. Violations of This Policy</h2>
      <p class="mb-4">Violations of this policy may lead to disciplinary action (up to, and including, termination of employment). In other cases, coaching or counseling may be the most effective approach to addressing the violation. While Naxrita retains discretion as to how to respond to any violation of this policy, any disciplinary process will be undertaken in accordance with all applicable local laws and other legal requirements.</p>
      <p class="mb-4">Please note that compliance with this policy is a baseline requirement to be fully eligible for promotion and rewards. In all cases where disciplinary action following an investigation into misconduct results in a final written warning, you will be ineligible for promotion in the next applicable cycle. In addition, there will be a 10% decrease applied to any base pay increase and to any applicable bonus submitted as part of your reward decisions in the next applicable cycle, subject to local law.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">7. Reasonable Accommodation</h2>
      <p class="mb-4">Consistent with our principle of meritocracy, Naxrita is committed to providing reasonable accommodation to job applicants and employees when a reasonable accommodation is available that does not create an undue hardship on the company's business. If you believe you need a reasonable accommodation because of your religion, a disability, or some other legitimate reason, please contact your HR Representative or Peopleline as appropriate for your location.</p>
    `,
    relatedPolicies: ['key-1001', 'key-1002', 'key-1004'],
    attachments: [
      { name: 'Naxrita_1003_Meritocracy_NonDiscrimination.pdf', url: '#', type: 'pdf', size: '380 KB' },
      { name: 'Accommodation_Request_Form.docx', url: '#', type: 'docx', size: '75 KB' }
    ]
  },

  // Key Policies
  {
    id: 'key-1004',
    title: 'Naxrita_1004 Addressing Personal Conflicts of Interest',
    category: 'key',
    effectiveDate: '2023-01-01',
    lastUpdated: '2023-08-01',
    version: '1.0',
    owner: 'Legal & Compliance',
    appliesTo: 'All Employees',
    status: 'active',
    tags: ['conflict', 'ethics', 'compliance', 'policy'],
    content: `
      <h2 class="text-2xl font-bold mb-4">1. What is a Personal Conflict and what are your responsibilities?</h2>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">1.1 What is a Personal Conflict?</h3>
      <p class="mb-4">A personal conflict of interest – referred to in this policy as a "Personal Conflict" – is a situation where your own personal interests (or those of a Family Member or close friend) can affect your ability to act in Naxrita's best interests, or interfere with your personal objectivity and obligations to Naxrita. It also includes potential or perceived Personal Conflicts.</p>
      <p class="mb-4">Personal Conflicts occasionally arise in the ordinary course of business (including through a change in circumstances such as a promotion or change in organization or client team) and are often easy to resolve, so long as they are disclosed early enough.</p>
      <p class="mb-4">Conflicts of interest between Naxrita and its clients are covered by Policy 0015 – Avoiding Conflicts of Interest with Clients.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">1.2 What are your responsibilities when a Personal Conflict arises?</h3>
      <p class="mb-4">Whenever a Personal Conflict arises or may arise, and consistent with our core value of Integrity, we expect you to exercise good judgment and comply with this policy. Your responsibilities are to:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Identify Personal Conflicts.</li>
        <li>Disclose them promptly to the individuals identified below. For Personal Conflicts not covered by the specific examples in Sections 2 through 5, disclose them to your People Lead and Legal.</li>
        <li>Obtain any required approvals and follow guidelines (along with any other responsibilities in this policy)—you should ask for these approvals and/or guidelines in writing and can request approvals from Legal by using the Personal Conflicts of Interest Tool.</li>
      </ul>
      <p class="mb-4">When in doubt, ask. If you are not sure if a Personal Conflict has arisen, or may arise, or what the approval process is, you should ask Legal.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">1.3 When can a Personal Conflict arise?</h3>
      <p class="mb-4">Personal Conflicts can arise in many different situations. You are in the best position to identify them because they are, by their very nature, personal. It is important that you use good judgment to identify Personal Conflicts. Situations where Personal Conflicts often arise – and which are described in more detail below – are:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>Personal investments or those of Family Members</li>
        <li>Hiring or recommending a Supplier managed or owned by a Family Member or close friend</li>
        <li>Outside activities, such as board, advisory board, board observer or officer positions with outside organizations, charitable activities, outside employment or starting your own business</li>
        <li>Personal or family relationships with other employees and people outside of Naxrita.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">1.4 Why is it important to avoid a Personal Conflict?</h3>
      <p class="mb-4">Our business is built on trust-based relationships. Conflicts of interest risk undermining that trust. A failure to avoid, or properly deal with, a Personal Conflict can have very serious consequences. For instance:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>People could question your integrity and reputation, and whether they want to work with you, or do business with Naxrita.</li>
        <li>Naxrita's reputation or client relationships could be damaged</li>
        <li>Naxrita could lose future business opportunities</li>
        <li>It could lead to disciplinary action being taken against you (up to, and including, termination of employment)</li>
        <li>Naxrita could face litigation resulting in liability for Naxrita (or individuals), including criminal and financial penalties and debarment</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">2. Investments and recommending business partners</h2>
      <p class="mb-4">When conducting Naxrita business, do not put personal, Family Member or close friend investments or interests ahead of Naxrita's interests and ensure that they do not:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>conflict or appear to conflict with Naxrita's professional objectivity or any other obligations to clients or</li>
        <li>prevent you from devoting full time and attention to Naxrita.</li>
      </ul>
      <p class="mb-4">While it is not possible to identify all the ways a personal, Family Member or close friend investment may cause a Personal Conflict, we have identified some situations where a Personal Conflict is likely. In these situations, follow the requirements below.</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">2.1 Investments in clients</h3>
      <p class="mb-4">If you are working on a client project, before you (or a Family Member or close friend) trade securities of that client or invest in that client, you must obtain approval from your client account lead and Legal. This requirement:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>is in addition to your responsibilities under Policy 1216 – Buying and Selling Securities - Insider Trading and Policy 0590 – Restricted Persons Trading; and</li>
        <li>does not apply to trading securities in Naxrita clients by an investment vehicle or fund in which you have a holding or interest, and where you do not have any decision-making discretion about the trade.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">2.2 Investments and other interests in business partners and recommending business partners</h3>
      <p class="mb-4">If you (or a Family Member or close friend) have or intend to make an investment—or otherwise have an interest—in any company that is connected to your work at Naxrita in a way that could give rise to a Personal Conflict or that you wish to recommend as a Supplier, client, alliance partner, joint venture partner or in any other capacity, then you must:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>disclose the investment, intent to make an investment or interest to your People Lead and Legal (prior to, or as promptly as practicable after, making any recommendation); and</li>
        <li>not participate in any decision related to that company.</li>
      </ul>
      <p class="mb-4">In addition, if you are an Naxrita Leader, your Market Unit Lead (or your People Lead, if you are the Market Unit Lead) and Legal must approve any relationship with that company.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">3. Outside activities (including board positions and dual employment)</h2>
      <p class="mb-4">Naxrita encourages its employees to participate in their communities. However, you must avoid outside activities that create or have the potential to create Personal Conflicts. If you are unsure whether an outside activity is permitted, ask Legal.</p>
      <p class="mb-4">This Section 3 does NOT apply:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>to outside activities in trade associations, standards organizations, open source communities and similar organizations where you are representing Naxrita and/or Naxrita is a member, which are covered by Policy 1463 – Memberships in Trade Associations;</li>
        <li>when you are formally asked by Naxrita to represent it at another entity or organization in an officer, director, board observer, or advisory board role to which Naxrita is entitled by virtue of an investment, joint venture, or other similar interest; or</li>
        <li>to participation in organizations through formal corporate citizenship initiatives.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">3.1 General guidelines for all outside activities</h3>
      <ol class="list-decimal pl-6 space-y-4 mb-4">
        <li>You must devote your full time and attention during your working hours to Naxrita. We understand that you are sometimes required to engage in outside activities during the work day. Use good judgment about the amount of time involved so that it does not compromise your ability to fulfill your work obligations and prioritize your commitments to Naxrita and clients. Follow your local requirements about recording your time, for example as charitable activity or as PTO.</li>
        <li>You must not provide to any outside organization any Naxrita confidential information, including information about opportunities (such as sales opportunities or potential client relationships) that Naxrita could have an interest in, and which are discovered through your position at Naxrita.</li>
        <li>You must participate in an individual capacity (not as a representative of Naxrita unless approved), fully disclose Naxrita employment to the outside organization and don't participate in its decisions relating to Naxrita.</li>
        <li>You must not use Naxrita resources (including information technology or intellectual property) or client equipment, except for limited personal use permitted by Policy 0057 – Acceptable Use of Information, Devices, and Technology.</li>
        <li>You, any business you start or any outside organization for which you serve must not provide services in competition with services provided by Naxrita, an alliance partner, or an Naxrita client that you are supporting, and any such organization must not be a Supplier, client, alliance partner or other organization where the position would result in a Personal Conflict.</li>
        <li>Naxrita executive officers must also comply with Policy 1438 – Related Person Transactions.</li>
      </ol>

      <h2 class="text-2xl font-bold mt-8 mb-4">4. Outside activities and investments, what if you are a new employee or inherit personal investments that require approval?</h2>
      <p class="mb-4">If you are a new employee (or you inherit any personal investments), this policy will apply to you effective on your Naxrita start date (or the date on which you acquire full legal title to the investments). Promptly disclose to your People Lead, Human Resources and Legal any Personal Conflict and comply with any Naxrita guidelines. We may allow you a six-month grace period if:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>you serve (or are committed to serve) in a position that is otherwise prohibited or that requires approval under Section 3, provided you resign from the prohibited position or one for which approval is denied within the grace period; or</li>
        <li>you (or a Family Member) already hold or inherit personal investments that require approval under Section 2, provided such investments are sold or transferred (other than to a Family Member) within the grace period, or you obtain approval under Section 2 to continue to hold such investments.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4">5. Personal and family relationships within Naxrita or with an outside person</h2>
      <p class="mb-4">We respect our people's private lives and recognize that many friendships and other personal relationships are formed in the workplace. We have a long history of family members working at Naxrita. We do not prohibit personal or family relationships. But, as described below, relationships at work and with people outside Naxrita can create Personal Conflicts.</p>
      
      <h3 class="text-xl font-semibold mt-6 mb-3">5.1 When do Personal Relationships and Family Relationships within Naxrita create a Personal Conflict and what are your responsibilities?</h3>
      <p class="mb-4">A Personal Conflict arises when an employee makes, influences or provides input into an Employment Decision affecting another employee with whom he or she has a Personal Relationship or Family Relationship. An "Employment Decision" is to be broadly understood to include any decision:</p>
      <ul class="list-disc pl-6 space-y-2 mb-4">
        <li>about a person's recruitment with Naxrita and/or any employee's selection (including selection for certain client projects), career advancement, performance management and evaluation, work assignments, compensation and benefits, ending employment or any other aspect of Naxrita's employment policies and practices; or</li>
        <li>otherwise affecting an individual employee, including budget allocation and expense approvals.</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-3">5.2 When do relationships with an outside person create a Personal Conflict and what are your responsibilities?</h3>
      <p class="mb-4">A Personal Relationship or Family Relationship with an outside person - a person who is not an employee of Naxrita- can create a Personal Conflict if you are responsible for any aspect of decision-making involving Naxrita-related business matters with the outside person (or any related organization such as their employer or a company they own).</p>

      <h3 class="text-xl font-semibold mt-6 mb-3">5.3 How are Personal Relationships and Family Relationships addressed?</h3>
      <p class="mb-4">Naxrita will consult with you and others to decide how to address the situation. This may include a change to your or another's work assignment, location or role or, in some instances, could result in separation from Naxrita.</p>
      <p class="mb-4">Naxrita will handle all information received with appropriate confidentiality. Certain actions taken to avoid conflicts may not be able to be kept confidential. We will seek to handle the matter with sensitivity, including in relation to communications around changes to work assignments.</p>

      <h2 class="text-2xl font-bold mt-8 mb-4">6. Violations of this policy and raising concerns</h2>
      <p class="mb-4">Violations of this policy may lead to disciplinary action (up to, and including, termination of employment). While Naxrita retains discretion as to how to respond to any violation of this policy, any disciplinary process will be undertaken in accordance with all applicable local laws and other legal requirements.</p>
      <p class="mb-4">Please note that compliance with this policy is a baseline requirement to be fully eligible for promotion and rewards. In all cases where disciplinary action following an investigation into misconduct results in a final written warning, you will be ineligible for promotion in the next applicable cycle. In addition, there will be a 10% decrease applied to any base pay increase and to any applicable bonus submitted as part of your reward decisions in the next applicable cycle, subject to local law.</p>
      <p class="mb-4">If you have a concern about any issue that you believe (or suspect) may violate any law or violate Naxrita's Code of Business Ethics or this or any other Naxrita policy, you have a right to speak up and we want you to speak up. Please see Policy 1000 – Speaking Up and Zero Tolerance for Retaliation for additional information on how to raise a concern.</p>
    `,
    relatedPolicies: ['key-1001', 'key-1002', 'global-1'],
    attachments: [
      { name: 'Naxrita_1004_Addressing_Personal_Conflicts.pdf', url: '#', type: 'pdf', size: '420 KB' },
      { name: 'Personal_Conflict_Disclosure_Form.docx', url: '#', type: 'docx', size: '85 KB' }
    ]
  }
];

// Helper function to get policies by category
export const getPoliciesByCategory = (categoryId) => {
  if (categoryId === 'all') return policies;
  return policies.filter(policy => policy.category === categoryId);
};

// Helper function to get policy by ID
export const getPolicyById = (id) => {
  return policies.find(policy => policy.id === id);
};

// Helper function to search policies
export const searchPolicies = (query) => {
  if (!query) return [];
  const searchTerm = query.toLowerCase();
  return policies.filter(policy => 
    policy.title.toLowerCase().includes(searchTerm) ||
    policy.content.toLowerCase().includes(searchTerm) ||
    policy.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};
