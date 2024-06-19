import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "../styles/userDataResPage.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f4f6f8",
      paper: "#fff",
    },
    text: {
      primary: "#333",
      secondary: "#888",
    },
  },
  typography: {
    h6: {
      fontSize: "1.1rem",
      fontWeight: 600,
    },
  },
});

export default function UserDataResPage() {
  const router = useRouter();
  const { userDataRes } = router.query;
  const [parsedUserDataRes, setParsedUserDataRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userDataRes) {
      try {
        const parsedData = JSON.parse(userDataRes);
        setParsedUserDataRes(parsedData);
      } catch (error) {
        setError("Error parsing customer data");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [userDataRes]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={styles.pageContainer}
        sx={{ padding: 3, backgroundColor: theme.palette.background.default }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Customer Data
        </Typography>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  User UID
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Wallet UID
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Wallet Address
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Wallet Type
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Transaction Hash
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Transaction To
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Transaction From
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Transaction Value
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Transaction Status
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Transaction Direction
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Stream UID
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Stream Description
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Recovery Key Credential ID
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Queue Job Tx Hash
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Pending Transaction Hash
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Name Address
                </TableCell>
                <TableCell sx={{ color: "white", whiteSpace: "nowrap" }}>
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parsedUserDataRes.map((userData, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                >
                  <TableCell>{userData.UserUID}</TableCell>
                  <TableCell>{userData.UserEmail}</TableCell>
                  <TableCell>{userData.UserName}</TableCell>
                  <TableCell>{userData.WalletUID}</TableCell>
                  <TableCell>{userData.WalletAddress}</TableCell>
                  <TableCell>{userData.WalletType}</TableCell>
                  <TableCell>{userData.TransactionHash}</TableCell>
                  <TableCell>{userData.TransactionTo}</TableCell>
                  <TableCell>{userData.TransactionFrom}</TableCell>
                  <TableCell>{userData.TransactionValue}</TableCell>
                  <TableCell>{userData.TransactionStatus}</TableCell>
                  <TableCell>{userData.TransactionDirection}</TableCell>
                  <TableCell>{userData.StreamUID}</TableCell>
                  <TableCell>{userData.StreamDescription}</TableCell>
                  <TableCell>{userData.RecoveryKeyCredentialID}</TableCell>
                  <TableCell>{userData.QueueJobTxHash}</TableCell>
                  <TableCell>{userData.PendingTransactionHash}</TableCell>
                  <TableCell>{userData.NameAddressName}</TableCell>
                  <TableCell>{userData.NameAddressAddress}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
}

function LoadingIndicator() {
  return (
    <div className={styles.loadingMessage}>
      <CircularProgress />
    </div>
  );
}

function ErrorMessage({ error }) {
  return <Typography className={styles.errorMessage}>{error}</Typography>;
}
