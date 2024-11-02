import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  //   AlertTriangle,
  //   CheckCircle,
  Copy,
  Filter,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  MoreVertical,
  Ban,
  CreditCard,
  PiggyBank,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
// import { toast } from "@/components/ui/use-toast";

// Types
type ContractStatus = "Active" | "Completed" | "Dispute";
type TabType = "Contracts" | "Transactions" | "Reported & Blocked";

interface Contract {
  giverName: string;
  giverAvatar: string;
  start: string;
  end: string;
  serviceClass: string;
  contractAmount: number;
  downPayment: number;
  status: ContractStatus;
}

interface UserProfile {
  name: string;
  avatar: string;
  dateOfReg: string;
  status: "Active" | "Inactive";
  verified: boolean;
  phone: string;
  email: string;
  address: string;
  about: string;
}

interface Statistics {
  active: number;
  pendingWallet: number;
  escrowBalance: number;
  walletBalance: number;
  disputes: number;
  paymentDisputes: number;
  completed: number;
  postNoDebit: boolean;
}

interface FinancialSummary {
  totalSpent: number;
  totalDeposit: number;
  totalWithdrawn: number;
  totalRefund: number;
}

// Dummy Data
const dummyProfile: UserProfile = {
  name: "Jude Nonso",
  avatar: "/placeholder.svg",
  dateOfReg: "12 Apr 2022",
  status: "Active",
  verified: true,
  phone: "08057473844",
  email: "jude.nonso@junkmail.com",
  address: "No. 5 Adekunle Street, Lagos",
  about:
    "I am a UI/UX professional with proficiency in bringing to life your digital product. Let's work together !",
};

const dummyStats: Statistics = {
  active: 12,
  pendingWallet: 20500,
  escrowBalance: 12500120,
  walletBalance: 52000000,
  disputes: 2,
  paymentDisputes: 1,
  completed: 6,
  postNoDebit: false,
};

const dummyFinancialSummary: FinancialSummary = {
  totalSpent: 1500000,
  totalDeposit: 3000000,
  totalWithdrawn: 1000000,
  totalRefund: 50000,
};

const dummyContracts: Contract[] = [
  {
    giverName: "Funke Adebayo",
    giverAvatar: "/placeholder.svg",
    start: "12 Apr 2022",
    end: "22 Apr 2022",
    serviceClass: "Web Development",
    contractAmount: 250000.0,
    downPayment: 150000.0,
    status: "Active",
  },
  {
    giverName: "Samuel Johnson",
    giverAvatar: "/placeholder.svg",
    start: "16 Apr 2022",
    end: "30 Apr 2022",
    serviceClass: "UI/UX Design",
    contractAmount: 250000.0,
    downPayment: 150000.0,
    status: "Completed",
  },
  {
    giverName: "Janet Doe",
    giverAvatar: "/placeholder.svg",
    start: "12 Apr 2022",
    end: "22 Apr 2022",
    serviceClass: "Web Development",
    contractAmount: 250000.0,
    downPayment: 150000.0,
    status: "Dispute",
  },
];

export default function Component() {
  const [activeTab, setActiveTab] = useState<TabType>("Contracts");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("NGN", "₦");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "The email address has been copied to your clipboard.",
      });
    });
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 space-y-4 sm:space-y-6">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={dummyProfile.avatar}
                  alt={dummyProfile.name}
                />
                <AvatarFallback>{dummyProfile.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {dummyProfile.name}
                  </h2>
                  <Badge variant="secondary">{dummyProfile.status}</Badge>
                  {dummyProfile.verified && (
                    <Badge variant="outline" className="text-blue-500">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Date Of Reg: {dummyProfile.dateOfReg}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{dummyProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-xs sm:text-sm">{dummyProfile.email}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => copyToClipboard(dummyProfile.email)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs sm:text-sm">
                  {dummyProfile.address}
                </span>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
              About Jude: {dummyProfile.about}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                <span className="hidden sm:inline">Suspend Account</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Message</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Section with Tabs */}
        <Card className="col-span-1 lg:col-span-2">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="financial-history">
                  Financial History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  <Card className="bg-yellow-100">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {dummyStats.active}
                      </div>
                      <div className="text-xs sm:text-sm">Active</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-black text-white">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {formatCurrency(dummyStats.pendingWallet)}
                      </div>
                      <div className="text-xs sm:text-sm">Pending Wallet</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {formatCurrency(dummyStats.escrowBalance)}
                      </div>
                      <div className="text-xs sm:text-sm">Escrow Balance</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-500 text-white">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {formatCurrency(dummyStats.walletBalance)}
                      </div>
                      <div className="text-xs sm:text-sm">Wallet Balance</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-red-100">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {dummyStats.disputes}
                      </div>
                      <div className="text-xs sm:text-sm">Dispute</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-100">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {dummyStats.paymentDisputes}
                      </div>
                      <div className="text-xs sm:text-sm">Payment Dispute</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-100">
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {dummyStats.completed}
                      </div>
                      <div className="text-xs sm:text-sm">Completed</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-2 sm:p-4">
                      <div className="text-lg sm:text-2xl md:text-4xl font-bold">
                        {dummyStats.postNoDebit ? "ON" : "OFF"}
                      </div>
                      <div className="text-xs sm:text-sm">Post No Debit</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="financial-history">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  <Card>
                    <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center">
                      <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-red-500" />
                      <div className="text-sm sm:text-lg md:text-2xl font-bold">
                        {formatCurrency(dummyFinancialSummary.totalSpent)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Total Spent
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center">
                      <PiggyBank className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-green-500" />
                      <div className="text-sm sm:text-lg md:text-2xl font-bold">
                        {formatCurrency(dummyFinancialSummary.totalDeposit)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Total Deposit
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center">
                      <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-blue-500" />
                      <div className="text-sm sm:text-lg md:text-2xl font-bold">
                        {formatCurrency(dummyFinancialSummary.totalWithdrawn)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Total Withdrawn
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-2 sm:p-4 flex flex-col items-center justify-center">
                      <RotateCcw className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 text-yellow-500" />
                      <div className="text-sm sm:text-lg  md:text-2xl font-bold">
                        {formatCurrency(dummyFinancialSummary.totalRefund)}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        Total Refund
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardContent className="p-2 sm:p-6">
          <Tabs defaultValue="Contracts" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <TabsList className="grid w-full sm:w-auto grid-cols-3 sm:flex">
                <TabsTrigger
                  value="Contracts"
                  onClick={() => setActiveTab("Contracts")}
                  className={`text-xs sm:text-sm ${
                    activeTab === "Contracts"
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : ""
                  }`}
                >
                  Contracts
                </TabsTrigger>
                <TabsTrigger
                  value="Transactions"
                  onClick={() => setActiveTab("Transactions")}
                  className="text-xs sm:text-sm"
                >
                  Transactions
                </TabsTrigger>
                <TabsTrigger
                  value="Reported & Blocked"
                  onClick={() => setActiveTab("Reported & Blocked")}
                  className="text-xs sm:text-sm"
                >
                  Reported & Blocked
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2 w-full sm:w-auto">
                <Input
                  placeholder="Search"
                  className="w-full sm:w-64 text-xs sm:text-sm"
                />
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="Contracts">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">
                        Giver Name
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Start
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">End</TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Service Class
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Contract amount (₦)
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Down Payment (₦)
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm">
                        Contract Status
                      </TableHead>
                      <TableHead className="text-xs sm:text-sm"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dummyContracts.map((contract, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                              <AvatarImage src={contract.giverAvatar} />
                              <AvatarFallback>
                                {contract.giverName.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="hidden sm:inline">
                              {contract.giverName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {contract.start}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {contract.end}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {contract.serviceClass}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {formatCurrency(contract.contractAmount)}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {formatCurrency(contract.downPayment)}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <Badge
                            variant="outline"
                            className={`text-xs sm:text-sm ${
                              contract.status === "Active"
                                ? "text-blue-500"
                                : contract.status === "Completed"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="Transactions">
              <div className="text-center py-4 text-sm">
                Transactions content goes here
              </div>
            </TabsContent>

            <TabsContent value="Reported & Blocked">
              <div className="text-center py-4 text-sm">
                Reported & Blocked content goes here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
