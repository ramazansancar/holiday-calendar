import { Icon } from "@iconify/react";
import Link from "next/link";
import { Divider, Button, Card, Typography} from 'antd';

export const Homepage = () => {
    return (
        <div>
            <Card title="Welcome to Holiday Calendar">
                <Typography.Title level={2}>Welcome to Holiday Calendar</Typography.Title>
                <Typography.Paragraph>
                    <p>Here you can view the public holidays of various countries.</p>
                    <p>Click on the country name to view the public holidays of that country.</p>
                </Typography.Paragraph>
                <Divider />
                <Link href="/calendar" passHref>
                    <Button type="primary"><Icon icon="line-md:calendar" width="24" height="24" /> View Calendar</Button>
                </Link>
            </Card>
        </div>
    )
}