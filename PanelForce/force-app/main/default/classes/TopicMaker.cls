public class TopicMaker {
    public static void createTopics(List<Panel__c> panels) {
        List<Topic__c> topics = new List<Topic__c>();
        for (Panel__c p: panels) {
            if (p.Template__c != null) {
                List<String> topicStr = p.Template__r.Topics__c.split(',');//= {'tech1','tech2','tech3','tech4'}
                List<String> maxScores = p.Template__r.Max_Scores__c.split(',');
                if(topics.size() != maxScores.size())
                    p.addError('CSV are not the same size');
                else 
                    for (Integer i = 0; i < topicStr.size(); i++) {
                        Topic__c topic = new Topic__c();//Creating a Topic object here
                        topic.Name = topicStr[i];
                        topic.Max_Score__c = Integer.valueOf(maxScores[i]);
                        topic.Panel__c = p.Id;
                        topics.add(topic);
                }
            }
        }
        if (topics.size() > 0)
            insert topics;
    }
}