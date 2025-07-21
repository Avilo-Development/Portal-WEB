import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";

export default function FinanceCategoryCard({ data, categories }: { data: any[], categories: any[] }) {
    const options = {
        chart: {
            toolbar: { show: false },
        },
        title: { text: '2025 Report' },
        dataLabels: { enabled: false },
        colors: ['#181c2c'],
        plotOptions: {
            bar: {
                columnWidth: '50%',
                borderRadius: 4,
            },
        },
        tooltip: {
            enabled: true,
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
            strokeDashArray: 5,
            xaxis: {
                lines: {
                    show: true,
                },
            },
            padding: {
                top: 5,
                right: 20,
            },
        },
        xaxis: {
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: categories,
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
    }

    return (
        <Card {...({} as React.ComponentProps<typeof Card>)}>
            <CardHeader {...({} as React.ComponentProps<typeof Card>)}
                floated={false}
                shadow={false}
                color="transparent"
                className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
            >
            </CardHeader>
            <CardBody {...({} as React.ComponentProps<typeof Card>)} className="px-2 pb-0">
                <Chart type="bar"
                    height={240}
                    series={[
                        {
                            name: "Value",
                            data: data,
                        }]} options={options} />
            </CardBody>
        </Card>
    )
}