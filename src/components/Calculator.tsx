import ArrowUpOutlined from '@ant-design/icons/ArrowUpOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import {
    Hotspot,
    ResourceList,
    Reward
} from '@helium/http';
import Alert from 'antd/lib/alert';
import Button from 'antd/lib/button';
import Card from 'antd/lib/card';
import Col from 'antd/lib/col';
import DatePicker from 'antd/lib/date-picker';
import Divider from 'antd/lib/divider';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import List from 'antd/lib/list';
import message from 'antd/lib/message';
import Row from 'antd/lib/row';
import Slider from 'antd/lib/slider';
import Space from 'antd/lib/space';
import Table from 'antd/lib/table';
import Typography from 'antd/lib/typography';
import moment, { Moment } from 'moment';
import React, {
    Fragment,
    useEffect,
    useState
} from 'react';
import heliumHttpClient from '~constants/heliumHttpClient';

function Calculator() {
    const [hotspotList, setHotspotList] = useState<ResourceList<Hotspot>>();
    const [hotspotListSearch, setHotspotListSearch] = useState<string>('');
    const [hotspotListSearching, setHotspotListSearching] = useState<boolean>(false);

    const lastMonthAt12AM = moment();
    lastMonthAt12AM.subtract({ month: 1 });
    lastMonthAt12AM.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

    const todayAt1159PM = moment();
    todayAt1159PM.set({ hour: 23, minute: 59, second: 59, millisecond: 999 });

    const [hotspot, setHotspot] = useState<Hotspot>();
    const [hotspotRewardsStartDate, setHotspotRewardsStartDate] = useState<Moment | undefined>(lastMonthAt12AM);
    const [hotspotRewardsEndDate, setHotspotRewardsEndDate] = useState<Moment | undefined>(todayAt1159PM);
    const [hotspotRewardsHistory, setHotspotRewardsHistory] = useState<Reward[]>();
    const [hotspotRewardsHistoryFetching, setHotspotRewardsHistoryFetching] = useState<boolean>(false);

    const [rewardsDistributionPercentage, setRewardsDistributionPercentage] = useState<number>(50);

    const [_update, update] = useState<number>(0);

    let recentSearches: string[] = [];
    const recentSearchesRaw = localStorage.getItem('recentSearches');
    if (recentSearchesRaw) recentSearches = JSON.parse(recentSearchesRaw);

    let totalRewards: number | undefined = undefined;
    if (hotspotRewardsHistory && hotspotRewardsHistory.length > 0) totalRewards = hotspotRewardsHistory.map(o => o.amount.floatBalance).reduce((pv, cv) => pv + cv);

    function searchHotspot(term: string) {
        if (term.length > 1 && !hotspotListSearching) {
            setHotspotListSearching(true);
            heliumHttpClient.hotspots.search(term)
                .then(list => setHotspotList(list))
                .catch(() => message.error('error'))
                .finally(() => setHotspotListSearching(false));
        }
    }

    function getHotspotRewardsHistory(hotspot: Hotspot) {
        if (!hotspotRewardsHistoryFetching && hotspotRewardsStartDate && hotspotRewardsEndDate) {
            setHotspotRewardsHistory(undefined);
            setHotspotRewardsHistoryFetching(true);
            console.log(hotspotRewardsStartDate.toISOString());
            console.log(hotspotRewardsEndDate.toISOString());
            hotspot.rewards.list({
                minTime: hotspotRewardsStartDate.toDate(),
                maxTime: hotspotRewardsEndDate.toDate()
            })
                .then(list => {
                    const rewards: Reward[] = [];
                    async function keepGrabbing(newList: ResourceList<Reward>) {
                        console.log(newList);
                        rewards.push(...newList.data);
                        if (newList.hasMore) await keepGrabbing(await newList.nextPage());
                    }
                    keepGrabbing(list)
                        .then(() => setHotspotRewardsHistory(rewards))
                        .finally(() => setHotspotRewardsHistoryFetching(false));
                })
                .catch(() => message.error('error'));
        }
    }

    useEffect(() => searchHotspot(hotspotListSearch), [hotspotListSearch]);

    return (
        <Card
            bordered={true}
            title="Helium Payment Calculator"
        >
            {!hotspot && (
                <Fragment>
                    <Card.Meta
                        title="Hotspot Search"
                        description="Search for your helium hotspot by name or address"
                    />
                    <br />
                    <Input
                        suffix={<LoadingOutlined style={{ display: hotspotListSearching ? undefined : 'none' }} />}
                        value={hotspotListSearch}
                        onChange={event => setHotspotListSearch(event.target.value)}
                    />
                    {recentSearches && recentSearches.length > 0 && (
                        <Fragment>
                            <br /><br />
                            <Typography.Paragraph>
                                <Space>
                                    <Typography.Text>Recent searches</Typography.Text>
                                    <Typography.Link onClick={() => {
                                        localStorage.removeItem('recentSearches');
                                        update(_update + 1);
                                    }}><small>(clear)</small></Typography.Link>
                                </Space>
                            </Typography.Paragraph>
                            {recentSearches.map(search => (
                                <div><Typography.Link onClick={() => setHotspotListSearch(search)}>{search}</Typography.Link></div>
                            ))}
                        </Fragment>
                    )}
                    {hotspotList && hotspotList.data.length > 0 && (
                        <Fragment>
                            <br />
                            <List
                                bordered={true}
                                dataSource={hotspotList.data}
                                loading={hotspotListSearching}
                                pagination={{
                                    hideOnSinglePage: true,
                                    size: 'small'
                                }}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                key={`list-item-hotspot-actions-1-${item.address}`}
                                                type="primary"
                                                onClick={() => {
                                                    setHotspot(item);
                                                    setHotspotList(undefined);
                                                    setHotspotListSearching(false);
                                                    if (!recentSearches) localStorage.setItem('recentSearches', JSON.stringify([item.name!]));
                                                    else if (!recentSearches.includes(item.name!)) localStorage.setItem('recentSearches', JSON.stringify([item.name!, ...recentSearches.slice(0, 4)]));
                                                }}
                                            >
                                                Select
                                            </Button>
                                        ]}
                                        key={`list-item-hotspot-${item.address}`}
                                    >
                                        {item.name}
                                    </List.Item>
                                )}
                                size="small"
                            />
                        </Fragment>
                    )}
                </Fragment>
            )}

            {hotspot && (
                <Fragment>
                    <Card.Meta
                        title="Hotspot"
                    />
                    <br />
                    <Card
                        bordered={true}
                        extra={(
                            <Button
                                icon={<CloseOutlined />}
                                type="text"
                                onClick={() => {
                                    setHotspotList(undefined);
                                    setHotspotListSearch('');
                                    setHotspotListSearching(false);
                                    setHotspot(undefined);
                                    setHotspotRewardsStartDate(undefined);
                                    setHotspotRewardsEndDate(undefined);
                                    setHotspotRewardsHistoryFetching(false);
                                    setHotspotRewardsHistory(undefined);
                                }}
                            />
                        )}
                        title={<Typography.Link href={`https://explorer.helium.com/hotspots/${hotspot.address}`} target="_blank">{hotspot.name}</Typography.Link>}
                    >
                        <Card.Meta
                            description={(
                                <Space size="large" wrap={true}>
                                    {hotspot.geocode && (
                                        <Space size="small">
                                            <Typography.Link href={`https://www.google.com/maps/search/${hotspot.lat},${hotspot.lng}`} target="_blank">{hotspot.geocode.shortStreet}, {hotspot.geocode.shortState}, {hotspot.geocode.shortCountry}</Typography.Link>
                                        </Space>
                                    )}
                                    {hotspot.owner && (
                                        <Space size="small">
                                            <UserOutlined />
                                            <Typography.Link href={`https://explorer.helium.com/accounts/${hotspot.owner}`} target="_blank">{hotspot.owner.substr(0, 5)}...{hotspot.owner.substr(hotspot.owner.length - 5, hotspot.owner.length)}</Typography.Link>
                                        </Space>
                                    )}
                                    {hotspot.elevation && (
                                        <Space size="small">
                                            <ArrowUpOutlined />
                                            <Typography.Text>{hotspot.elevation} meters</Typography.Text>
                                        </Space>
                                    )}
                                </Space>
                            )}
                        />
                    </Card>

                    <Divider />

                    <Card.Meta
                        title="Period"
                    />
                    <br />
                    <Row gutter={10}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                colon={false}
                                extra={hotspotRewardsStartDate && `UTC: ${hotspotRewardsStartDate.toISOString()}`}
                                label="Start Date"
                                labelCol={{ span: 24 }}
                            >
                                <DatePicker
                                    className="w-100"
                                    showTime={{ use12Hours: true }}
                                    value={hotspotRewardsStartDate}
                                    onChange={value => setHotspotRewardsStartDate(value || undefined)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                extra={hotspotRewardsEndDate && `UTC: ${hotspotRewardsEndDate.toISOString()}`}
                                label="End Date"
                                labelCol={{ span: 24 }}
                            >
                                <DatePicker
                                    className="w-100"
                                    showTime={{ use12Hours: true }}
                                    value={hotspotRewardsEndDate}
                                    onChange={value => setHotspotRewardsEndDate(value || undefined)}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button
                        block={true}
                        disabled={!hotspotRewardsStartDate || !hotspotRewardsEndDate}
                        loading={hotspotRewardsHistoryFetching}
                        onClick={() => getHotspotRewardsHistory(hotspot)}
                    >
                        Fetch Rewards
                    </Button>

                    {hotspotRewardsStartDate && hotspotRewardsEndDate && hotspotRewardsHistory !== undefined && (
                        <Fragment>
                            <br /><br />
                            <Table
                                bordered={true}
                                scroll={{ y: 250 }}
                                columns={[
                                    { dataIndex: 'timestamp', key: 'timestamp', title: 'Time' },
                                    { dataIndex: 'amount', key: 'amount', title: 'Amount' }
                                ]}
                                dataSource={hotspotRewardsHistory.map(data => {
                                    const timestamp = moment.utc(data.timestamp);
                                    return {
                                        amount: data.amount.toString(),
                                        timestamp: `${timestamp.toLocaleString()} (${timestamp.fromNow()})`
                                    };
                                })}
                                footer={() => null}
                                locale={{ emptyText: 'Hotspot earned 0 HNT during the selected date range' }}
                                pagination={false}
                                showSorterTooltip={true}
                                size="small"
                            />

                            {totalRewards && (
                                <Fragment>
                                    <br />
                                    <Typography.Paragraph>
                                        This hotspot has earned <Typography.Text type="success">{totalRewards.toFixed(4)}</Typography.Text> HNT&nbsp;
                                        between <Typography.Text strong={true}>{hotspotRewardsStartDate.toLocaleString()}</Typography.Text>&nbsp;
                                        and <Typography.Text strong={true}>{hotspotRewardsEndDate.toLocaleString()}</Typography.Text>.
                                    </Typography.Paragraph>

                                    <Divider />

                                    <Card.Meta
                                        title="Distribution"
                                        description="Drag the slider to change how the rewards accrued during the pay period should be distributed"
                                    />
                                    <br />
                                    <Row align="middle" gutter={10}>
                                        <Col>
                                            <Typography.Text>Owner</Typography.Text>
                                        </Col>
                                        <Col flex="auto">
                                            <Slider
                                                min={5}
                                                max={95}
                                                step={5}
                                                tipFormatter={value => value && (
                                                    <Space direction="vertical">
                                                        <Typography.Text style={{ color: 'white' }}>Owner: {100 - value}%</Typography.Text>
                                                        <Typography.Text style={{ color: 'white' }}>Host: {value}%</Typography.Text>
                                                    </Space>
                                                )}
                                                tooltipPlacement="top"
                                                trackStyle={{ display: 'none' }}
                                                value={rewardsDistributionPercentage}
                                                onChange={value => setRewardsDistributionPercentage(value)}
                                            />
                                        </Col>
                                        <Col>
                                            <Typography.Text>Host</Typography.Text>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Alert
                                        message={(
                                            <Fragment>
                                                The hotspot owner should pay the host <Typography.Text copyable={true} type="success">{(totalRewards * (rewardsDistributionPercentage / 100)).toFixed(4)}</Typography.Text> HNT
                                            </Fragment>
                                        )}
                                        type="info"
                                    />
                                </Fragment>
                            )}
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Card>
    )
}

export default Calculator;
